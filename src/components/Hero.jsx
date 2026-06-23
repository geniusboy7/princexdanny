import { WEDDING_DETAILS } from '../constants/wedding';
import Countdown from './Countdown';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h2 className="secondary-heading">Save the Date</h2>
                <h1 className="names">{WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}</h1>
                <p className="date">{WEDDING_DETAILS.displayDate} | {WEDDING_DETAILS.time}</p>
                <Countdown targetDate={WEDDING_DETAILS.targetDate} />
            </div>
        </section>
    );
};

export default Hero;
