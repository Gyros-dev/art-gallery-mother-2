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

    if (images.length === 0) return <p>Загрузка галереи...</p>;

    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () => setCurrent((c) => (c + 1) % images.length);

    const main = images[current];
    const left = images[(current - 1 + images.length) % images.length];
    const right = images[(current + 1) % images.length];

    return (
        <div id="gallery">
            <div className="side left" onClick={prev}>
                <img src={left.src} alt="prev" />
            </div>

            <div
                className="center tooltip-wrapper"
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

            <div className="side right" onClick={next}>
                <img src={right.src} alt="next" />
            </div>
        </div>
    );
}