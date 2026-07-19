# Secret RSVP Access — Design

**Date:** 2026-07-19

## Goal

Re-enable the RSVP form (currently commented out and showing "RSVP has ended")
behind a passphrase, so it can be shared privately with a specific guest without
publicly re-opening RSVPs.

## Behavior

- Publicly, the RSVP section still shows **"RSVP has ended"**.
- Below that, an understated passcode field ("Have a code?") with an input and
  unlock button.
- Entering the code **`danny2026`** reveals the original RSVP form
  (name / email / attending radio).
- Wrong code shows a gentle inline error; the form stays hidden.
- **No persistence** — unlock is component state only. A page reload re-locks
  the form and the guest must re-enter the code.
- The Hero "RSVP Now" button stays hidden so the form is not advertised.

## Implementation

All changes are contained in `src/components/RSVP.jsx`:

- Add state: `unlocked` (bool, default `false`), `codeInput` (string),
  `codeError` (bool).
- Constant `RSVP_ACCESS_CODE = 'danny2026'`.
- Un-comment the existing `<form>` block. Its submit logic
  (`handleSubmit`, `VITE_RSVP_API_URL`, `SuccessModal`) is unchanged.
- Gate handler compares `codeInput.trim()` against `RSVP_ACCESS_CODE`
  (case-insensitive); on match sets `unlocked = true`, else sets `codeError`.
- Render: `unlocked` → intro + form; otherwise → "RSVP has ended" + passcode UI.
- Minimal CSS for the passcode row added to `RSVP.css`.

## Caveat

This is a static client-side site, so the code ships in the JS bundle and is
discoverable by anyone reading the source. It gates the form from ordinary
guests, not from a determined technical person — acceptable for a wedding RSVP.
