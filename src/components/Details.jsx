import { WEDDING_DETAILS, WEDDING_COLORS } from '../constants/wedding';
import { generateICS, downloadCalendarFile } from '../utils/calendar';
import './Details.css';

const Details = () => {
    const handleAddToCalendar = (e) => {
        e.preventDefault();
        const event = {
            title: `${WEDDING_DETAILS.groom} & ${WEDDING_DETAILS.bride}'s Wedding`,
            description: `Join us for the wedding of ${WEDDING_DETAILS.fullNameGroom} and ${WEDDING_DETAILS.fullNameBride}. Location details will be sent to you via email once you RSVP.`,
            location: "Location details sent via email after you RSVP",
            start: WEDDING_DETAILS.targetDate.replace(/[-:]/g, ''),
            end: "20260808T233000" // Hardcoded end for now as it's not in constants
        };
        const icsContent = generateICS(event);
        downloadCalendarFile('wedding-invite.ics', icsContent);
    };

    return (
        <section className="details">
            <div className="container">
                <h2 className="section-title">When & Where</h2>
                <div className="details-grid">
                    <div className="detail-card">
                        <h3 className="secondary-heading">Ceremony &amp; Cocktail Hour</h3>
                        <p className="time">{WEDDING_DETAILS.date} | {WEDDING_DETAILS.time}</p>
                        <p className="location-note">
                            Location details will be sent to you via email once you RSVP.
                        </p>
                        <p className="cocktail-note">
                            Join us for a short cocktail hour immediately after the ceremony.
                        </p>
                        <div className="action-buttons">
                            <a href="#" onClick={handleAddToCalendar} className="btn-secondary">
                                Add to Calendar
                            </a>
                        </div>
                    </div>
                    <div className="detail-card">
                        <h3 className="secondary-heading">Dress Code</h3>
                        <p>{WEDDING_DETAILS.dressCode}</p>
                        <div className="color-grid">
                            {WEDDING_COLORS.map((color) => (
                                <div className="color-swatch" key={color.name}>
                                    <span
                                        className="color-chip"
                                        style={{ backgroundColor: color.hex }}
                                    ></span>
                                    <span className="color-name">{color.name}</span>
                                    <span className="color-hex">{color.hex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
