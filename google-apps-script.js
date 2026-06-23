/**
 * Google Apps Script to handle RSVP submissions from the wedding website.
 *
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Add your Resend API key under Project Settings > Script Properties:
 *      Property: RESEND_API_KEY   Value: re_xxxxxxxxxxxx
 * 5. Update FROM_EMAIL below to a sender on a domain verified in Resend
 *    (for quick testing you can use "onboarding@resend.dev", which only
 *    delivers to the email address that owns the Resend account).
 * 6. Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 * 7. Copy the Web App URL and add it to your project's .env file as VITE_RSVP_API_URL.
 */

// --- Email configuration ---------------------------------------------------
// Sender on the geniustechhub.com domain, which is verified in Resend.
var FROM_EMAIL = "Prince & Daniella <wedding@geniustechhub.com>";

// Preferred: store the key in Project Settings > Script Properties as RESEND_API_KEY.
// The fallback below lets you paste-and-run, but it commits the secret to the repo —
// keep this repo private and rotate the key if it is ever exposed.
var RESEND_API_KEY_FALLBACK = "re_CAyNQvYm_45VRTD9nHPCHqXjCPaDTWJ2X";

// Location details that are kept off the public site and only shared by email.
var EVENT_DETAILS = {
    venue: "Glass Garden Events Center",
    location: "Accra, Ghana",
    date: "August 8th, 2026",
    time: "3:30 PM",
    mapsUrl: "https://maps.app.goo.gl/a3ij18RY6yqjSVNk8"
};
// ---------------------------------------------------------------------------

function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data;

    try {
        data = JSON.parse(rawData);
    } catch (err) {
        // Fallback if content type issues occur, though unlikely with our frontend setup
        data = e.parameter;
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Timestamp", "Name", "Email", "Attending"]);
    }

    sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.attending
    ]);

    // Email the location details to attending guests who left an address.
    if (data.attending === "yes" && data.email) {
        try {
            sendLocationEmail(data.name, data.email);
        } catch (err) {
            // Don't fail the RSVP if the email send hiccups; just log it.
            console.error("Failed to send location email: " + err);
        }
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function sendLocationEmail(name, email) {
    var apiKey = PropertiesService.getScriptProperties().getProperty("RESEND_API_KEY") || RESEND_API_KEY_FALLBACK;
    if (!apiKey) {
        throw new Error("No Resend API key found (set RESEND_API_KEY script property or RESEND_API_KEY_FALLBACK).");
    }

    var firstName = (name || "").split(" ")[0] || "there";
    var d = EVENT_DETAILS;

    var html =
        '<div style="font-family: Georgia, \'Times New Roman\', serif; color: #362624; max-width: 540px; margin: 0 auto; padding: 32px;">' +
            '<h1 style="font-size: 26px; letter-spacing: 1px; color: #00827E; margin: 0 0 4px;">Prince &amp; Daniella</h1>' +
            '<p style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #C19A4B; margin: 0 0 24px;">You\'re invited &mdash; here are the details</p>' +
            '<p style="font-size: 16px; line-height: 1.6;">Dear ' + escapeHtml(firstName) + ',</p>' +
            '<p style="font-size: 16px; line-height: 1.6;">Thank you for your RSVP! We can\'t wait to celebrate with you. As promised, here are the details for the ceremony and the short cocktail hour that follows.</p>' +
            '<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 16px;">' +
                row("Venue", escapeHtml(d.venue)) +
                row("Address", escapeHtml(d.location)) +
                row("Date", escapeHtml(d.date)) +
                row("Time", escapeHtml(d.time)) +
            '</table>' +
            '<p style="text-align: center; margin: 28px 0;">' +
                '<a href="' + d.mapsUrl + '" style="display: inline-block; padding: 12px 28px; background: #00827E; color: #ffffff; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;">Get Directions</a>' +
            '</p>' +
            '<p style="font-size: 14px; line-height: 1.6; color: #6b5d57;">Please keep these details handy &mdash; we look forward to seeing you there.</p>' +
            '<p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">With love,<br/>Prince &amp; Daniella</p>' +
        '</div>';

    var payload = {
        from: FROM_EMAIL,
        to: [email],
        subject: "Your invitation details — Prince & Daniella's Wedding",
        html: html
    };

    var response = UrlFetchApp.fetch("https://api.resend.com/emails", {
        method: "post",
        contentType: "application/json",
        headers: { Authorization: "Bearer " + apiKey },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    });

    var code = response.getResponseCode();
    if (code < 200 || code >= 300) {
        throw new Error("Resend returned " + code + ": " + response.getContentText());
    }
}

function row(label, value) {
    return '<tr>' +
        '<td style="padding: 8px 0; color: #C19A4B; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; width: 110px; vertical-align: top;">' + label + '</td>' +
        '<td style="padding: 8px 0; font-weight: bold;">' + value + '</td>' +
    '</tr>';
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function doGet(e) {
    return ContentService.createTextOutput("RSVP API is running!");
}
