import React from 'react';
import ImageSlider from './components/ImageSlider';
import Hero from './components/Hero';
import Story from './components/Story';
import Details from './components/Details';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Menu from './components/Menu';
import FAQ from './components/FAQ';
import Gifts from './components/Gifts';
import { WEDDING_DETAILS } from './constants/wedding';
import './index.css';

function App() {
  return (
    <div className="app-container split-layout">
      {/* Floating Menu */}
      <Menu />

      <div className="left-panel">
        <ImageSlider />
      </div>
      <div className="right-panel">
        <div className="scroll-content">
          <div id="home"><Hero /></div>
          <div id="story"><Story /></div>
          <div id="details"><Details /></div>

          {/* Gallery placeholder in scroll if needed, or kept just in menu linking to slider (which is tricky in splitView). 
              For now, let's keep a small grid gallery in content as well for the 'Gallery' link to have a destination, 
              or we re-enable the Gallery component. The user said 'Same gallery on left', but menu needs a target.
              Let's re-add the grid gallery for full viewing experience. */}
          <div id="gallery"><Gallery /></div>

          <div id="faqs"><FAQ /></div>
          <div id="gifts"><Gifts /></div>
          <div id="rsvp"><RSVP /></div>

          <footer className="footer">
            <p className="footer-initials">{WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}</p>
            <p className="footer-date">{WEDDING_DETAILS.displayDate}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
