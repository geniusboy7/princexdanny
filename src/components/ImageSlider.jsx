import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';

const SLIDES = [
    '/slides/1.jpg',
    '/slides/2.jpg',
    '/slides/3.jpg',
    '/slides/44.jpeg',
    '/slides/55.jpeg',
    '/slides/66.jpeg',
];

const INTERVAL_MS = 4500;

// Pick two distinct random photos, avoiding the pair shown immediately before.
const pickPair = (exclude = []) => {
    let pool = SLIDES.map((_, i) => i).filter((i) => !exclude.includes(i));
    if (pool.length < 2) pool = SLIDES.map((_, i) => i);

    const a = pool[Math.floor(Math.random() * pool.length)];
    const rest = pool.filter((i) => i !== a);
    const b = rest[Math.floor(Math.random() * rest.length)];
    return [a, b];
};

// Build a layer (a pair of photos). `exclude` avoids repeating the previous pair.
const makeLayer = (key, exclude) => {
    const [l, r] = pickPair(exclude);
    return { key, left: SLIDES[l], right: SLIDES[r], pair: [l, r] };
};

const ImageSlider = () => {
    const counter = useRef(1);

    // The last layer in the array is the "front" pair sliding in; older ones fade out.
    const [layers, setLayers] = useState(() => [makeLayer(0, [])]);

    // Preload every photo so the slide-in never shows a blank half.
    useEffect(() => {
        SLIDES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Keep only the outgoing pair + the new incoming pair.
            setLayers((prev) => {
                const last = prev[prev.length - 1];
                return [...prev.slice(-1), makeLayer(counter.current++, last.pair)];
            });
        }, INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-slider">
            {layers.map((layer, i) => {
                const isFront = i === layers.length - 1;
                return (
                    <div
                        className={`slide-pair ${isFront ? 'entering' : 'leaving'}`}
                        key={layer.key}
                    >
                        <div
                            className="slide-half left"
                            style={{ backgroundImage: `url(${layer.left})` }}
                        />
                        <div
                            className="slide-half right"
                            style={{ backgroundImage: `url(${layer.right})` }}
                        />
                    </div>
                );
            })}
            <div className="slider-overlay"></div>
        </div>
    );
};

export default ImageSlider;
