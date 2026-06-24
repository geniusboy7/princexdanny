import React, { useRef } from 'react';
import { Calendar, Download, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { WEDDING_DETAILS } from '../constants/wedding';
import { triggerConfetti } from '../utils/confetti';
import { generateICS, downloadCalendarFile } from '../utils/calendar';
import './SuccessModal.css';

const SuccessModal = ({ onClose, formData }) => {
    const cardRef = useRef(null);

    // Trigger confetti on mount
    React.useEffect(() => {
        triggerConfetti();
    }, []);

    const downloadPDF = () => {
        if (cardRef.current === null) return;

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a5',
            putOnlyUsedFonts: true
        });

        // Constants for PDF layout
        const pdfWidth = 130;
        const xOffset = 10;
        const yOffset = 10;
        const cardWidthPx = 320;

        doc.html(cardRef.current, {
            callback: function (doc) {
                doc.save(`wedding-invite-${formData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
            },
            x: xOffset,
            y: yOffset,
            width: pdfWidth,
            windowWidth: cardWidthPx
        });
    };

    const addToCalendar = () => {
        const event = {
            title: `${WEDDING_DETAILS.groom} & ${WEDDING_DETAILS.bride}'s Wedding`,
            description: `Join us for the wedding of ${WEDDING_DETAILS.fullNameGroom} and ${WEDDING_DETAILS.fullNameBride}. Location details will be sent to you via email.`,
            location: "Location details sent via email",
            start: WEDDING_DETAILS.targetDate.replace(/[-:]/g, ''),
            end: "20260808T233000"
        };

        const icsContent = generateICS(event);
        downloadCalendarFile('wedding-invite.ics', icsContent);
    };

    const isAttending = formData.attending === 'yes';

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-in">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>

                <div className="success-header">
                    <div className="check-icon">✓</div>
                    <h2>Thank you for RSVPing!</h2>
                    <p>{isAttending
                        ? "We are so excited to celebrate with you. Location details will be sent to you via email shortly."
                        : "We're sorry you couldn't join us."
                    }</p>
                    {isAttending && (
                        <p className="email-check-note">
                            Please check your inbox, and your spam or junk folder, for the email.
                        </p>
                    )}
                </div>

                {isAttending ? (
                    <div className="invitation-download-section">
                        <h3>Your Personalized Card</h3>
                        <p className="personalized-msg">
                            Thank you for accepting our Invitation, <strong>{formData.name}</strong>.
                        </p>

                        <div className="card-container">
                            <div className="invitation-card" ref={cardRef}>
                                <div className="card-border">
                                    <div className="card-inner">
                                        <h4 className="card-header-text">Wedding Invitation</h4>

                                        <div className="card-main-content">
                                            <h2 className="card-names">{WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}</h2>
                                            <div className="card-details">
                                                <p className="card-guest-name">For: {formData.name}</p>
                                                <div className="separator-line"></div>
                                                <p className="card-date">{WEDDING_DETAILS.displayDate}</p>
                                                <p className="card-time">{WEDDING_DETAILS.time}</p>
                                                <p className="card-location">Location sent via email</p>
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <span className="card-maps-link">Location details sent via email</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={downloadPDF} className="btn-action">
                                <Download size={18} />
                                Save PDF
                            </button>
                            <button onClick={addToCalendar} className="btn-action outline">
                                <Calendar size={18} />
                                Add to Calendar
                            </button>
                        </div>

                        <div className="invite-image-section">
                            <h3>Your Invitation</h3>
                            <img
                                src="/princexdanny-invite.jpg"
                                alt="Prince & Daniella wedding invitation"
                                className="invite-image"
                            />
                            <a
                                href="/princexdanny-invite.jpg"
                                download="PrinceXDanny-Invitation.jpg"
                                className="btn-action"
                            >
                                <Download size={18} />
                                Save Invitation
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="decline-section">
                        <p className="decline-msg">
                            We appreciate you letting us know, <strong>{formData.name}</strong>. You'll be missed!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessModal;
