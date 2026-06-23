import React from 'react';
import './Story.css';

const Story = () => {
    return (
        <section className="story">
            <div className="container">
                <h2 className="section-title">Our Story</h2>
                <div className="story-grid">
                    <div className="story-text">
                        <p>From the moment we met, we knew there was something special. Our journey has been filled with laughter, adventures, and a shared vision for the future.</p>
                        <p><strong>Prince Aduama</strong> and <strong>Daniella Owusua Adjei</strong> invite you to witness the beginning of our forever.</p>
                    </div>
                    <div className="story-motto">
                        <blockquote>"Love is not just something you feel, it's something you do."</blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
