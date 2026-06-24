import React, { useState, useEffect } from 'react';
import './Gallery.css';

/*
 * ---------------------------------------------------------------------------
 * ALBUM GALLERY (temporarily disabled)
 * Re-enable this once we have the real photo albums after the event.
 * Also restore these imports at the top:
 *   import { GALLERIES } from '../constants/galleries';
 *   import GalleryModal from './GalleryModal';
 *
 * const Gallery = () => {
 *     const [selectedGallery, setSelectedGallery] = useState(null);
 *
 *     const handleOpenGallery = (gallery) => {
 *         setSelectedGallery(gallery);
 *     };
 *
 *     const handleCloseGallery = () => {
 *         setSelectedGallery(null);
 *     };
 *
 *     return (
 *         <section className="gallery">
 *             <div className="container">
 *                 <h2 className="section-title">Gallery</h2>
 *                 <p className="gallery-hint">Tap on an album to see more moments</p>
 *                 <div className="gallery-grid">
 *                     {GALLERIES.map((item) => (
 *                         <div key={item.id} className="gallery-item" onClick={() => handleOpenGallery(item)}>
 *                             <img src={item.cover} alt={item.title} />
 *                             <div className="gallery-overlay">
 *                                 <span>{item.title}</span>
 *                                 <p className="gallery-count">{item.images.length + 1} Photos</p>
 *                             </div>
 *                         </div>
 *                     ))}
 *                 </div>
 *             </div>
 *             <GalleryModal gallery={selectedGallery} onClose={handleCloseGallery} />
 *         </section>
 *     );
 * };
 * ---------------------------------------------------------------------------
 */

const SLIDES = [
    '/slides/1.jpg',
    '/slides/2.jpg',
    '/slides/3.jpg',
    '/slides/44.jpeg',
    '/slides/55.jpeg',
    '/slides/66.jpeg',
];

// Bento layout: tall/square tiles match the portrait photos so faces aren't cropped.
// Each tile crossfades through the photo set on a staggered timer.
const TILES = ['big', 'tall', 'tall', 'big', 'tall', 'tall'];

const SWAP_MS = 2800;

const MosaicTile = ({ span, current }) => (
    <div className={`mosaic-tile mosaic-${span}`}>
        {SLIDES.map((src, i) => (
            <div
                key={i}
                className="mosaic-photo"
                style={{ backgroundImage: `url(${src})`, opacity: i === current ? 1 : 0 }}
            />
        ))}
    </div>
);

const Gallery = () => {
    // One photo index per tile, always kept as a permutation so every visible
    // photo is unique. Each tick swaps two tiles' photos with each other.
    const [assignment, setAssignment] = useState(() => TILES.map((_, i) => i % SLIDES.length));

    // Preload so the first crossfades don't flash.
    useEffect(() => {
        SLIDES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAssignment((prev) => {
                const next = [...prev];
                const a = Math.floor(Math.random() * next.length);
                let b = Math.floor(Math.random() * next.length);
                if (b === a) b = (a + 1) % next.length;
                [next[a], next[b]] = [next[b], next[a]];
                return next;
            });
        }, SWAP_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="gallery">
            <div className="container">
                <h2 className="section-title">Gallery</h2>
                <p className="gallery-hint">A few of our favourite moments</p>
                <div className="mosaic-grid">
                    {TILES.map((span, i) => (
                        <MosaicTile key={i} span={span} current={assignment[i]} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
