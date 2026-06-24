import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <div className="menu-container">
            <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? 'Close' : 'Menu'}
            </button>

            <div className={`menu-dropdown ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={() => scrollToSection('home')}>Home</li>
                    <li onClick={() => scrollToSection('story')}>Our Story</li>
                    <li onClick={() => scrollToSection('details')}>Schedule & Venue</li>
                    <li onClick={() => scrollToSection('gallery')}>Gallery</li>
                    <li onClick={() => scrollToSection('faqs')}>FAQs</li>
                    <li onClick={() => scrollToSection('gifts')}>Gifts</li>
                    <li onClick={() => scrollToSection('rsvp')}>RSVP</li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
