import React, { useState } from 'react';
import SuccessModal from './SuccessModal';
import { WEDDING_DETAILS } from '../constants/wedding';
import './RSVP.css';

// Secret access code for the (publicly closed) RSVP form. Note: this ships in
// the client bundle, so it gates the form from ordinary guests, not from a
// determined technical person — acceptable for a private wedding RSVP.
const RSVP_ACCESS_CODE = 'danny2026';

const RSVP = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Passphrase gate — unlock is intentionally NOT persisted, so a reload re-locks.
    const [unlocked, setUnlocked] = useState(false);
    const [codeInput, setCodeInput] = useState('');
    const [codeError, setCodeError] = useState(false);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (codeInput.trim().toLowerCase() === RSVP_ACCESS_CODE.toLowerCase()) {
            setUnlocked(true);
            setCodeError(false);
        } else {
            setCodeError(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiUrl = import.meta.env.VITE_RSVP_API_URL;

        try {
            if (!apiUrl) {
                console.warn('RSVP API URL not set. Simulating success for development.');
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                await fetch(apiUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(formData),
                });
            }
            setShowSuccess(true);
        } catch (error) {
            console.error('RSVP Error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rsvp" id="rsvp">
            <div className="container small">
                <h2 className="section-title">RSVP</h2>

                {!unlocked ? (
                    <>
                        <p className="rsvp-intro">RSVP has ended</p>

                        <form className="rsvp-gate" onSubmit={handleUnlock}>
                            <label htmlFor="rsvp-code" className="rsvp-gate-label">Have a code?</label>
                            <div className="rsvp-gate-row">
                                <input
                                    type="text"
                                    id="rsvp-code"
                                    className="rsvp-gate-input"
                                    value={codeInput}
                                    onChange={(e) => { setCodeInput(e.target.value); setCodeError(false); }}
                                    placeholder="Enter code"
                                    autoComplete="off"
                                />
                                <button type="submit" className="rsvp-gate-btn">Unlock</button>
                            </div>
                            {codeError && <p className="rsvp-gate-error">Hmm, that code isn't right.</p>}
                        </form>
                    </>
                ) : (
                    <>
                        <p className="rsvp-intro">We would be honored to have you with us. Please let us know if you can attend by {WEDDING_DETAILS.rsvpDeadline}.</p>

                        <form className="rsvp-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                                <p className="field-hint">We'll send your location details here once you RSVP.</p>
                            </div>

                            <div className="form-group">
                                <label>Will you be attending?</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} />
                                        <span>Joyfully Accepts</span>
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} />
                                        <span>Regretfully Declines</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send RSVP'}
                            </button>
                        </form>
                    </>
                )}
            </div>

            {showSuccess && <SuccessModal onClose={() => {
                setShowSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    attending: 'yes'
                });
            }} formData={formData} />}
        </section>
    );
};

export default RSVP;
