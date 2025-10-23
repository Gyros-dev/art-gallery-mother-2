import React, { useEffect, useState, useRef } from 'react';
import '../styles/gallery.css';
import '../styles/tooltip.css';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef(null);

    useEffect(() => {
        fetch('/data/images.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setImages(data))
            .catch((err) => console.error('Ошибка загрузки изображений:', err));
    }, []);

    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') triggerSlide('left');
            if (e.key === 'ArrowRight') triggerSlide('right');
        };

        const handleWheel = (e) => {
            if (e.deltaY > 0) triggerSlide('right');
            else if (e.deltaY < 0) triggerSlide('left');
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [images]);


    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () => setCurrent((c) => (c + 1) % images.length);

    const triggerSlide = (dir) => {
        if (animating || images.length === 0) return;
        setAnimating(true);
        setDirection(dir);

        setTimeout(() => {
            if (dir === 'left') prev();
            else next();
            setAnimating(false);
        }, 400); // длительность анимации в мс
    };

    if (images.length === 0) return <p>Загрузка галереи...</p>;


    const main = images[current];
    const left = images[(current - 1 + images.length) % images.length];
    const right = images[(current + 1) % images.length];

    return (
        <div id="gallery">
            <div className="side left" onClick={() => triggerSlide('left')}>
                <img src={left.src} alt="prev" />
            </div>

            <div
                className={`center tooltip-wrapper ${animating ? (direction === 'left' ? 'slide-left' : 'slide-right') : ''}`}
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
            >
                <img src={main.src} alt="main" />
                <div
                    ref={tooltipRef}
                    className="tooltip"
                    style={{ opacity: tooltipVisible ? 1 : 0 }}
                >
                    <strong>{main.info}</strong><br />
                    {main.year && <span>{main.year}</span>}<br />
                    {main.material && <span>{main.material}</span>}<br />
                    {main.size && <span>{main.size}</span>}<br />
                    {main.location && <span>{main.location}</span>}
                </div>
            </div>

            <div className="side right" onClick={() => triggerSlide('right')}>
                <img src={right.src} alt="next" />
            </div>
        </div>
    );
}