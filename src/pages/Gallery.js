import React, { useEffect, useState } from 'react';
import '../styles/gallery.css';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);

    // Загружаем JSON из public/data/images.json
    useEffect(() => {
        fetch('/data/images.json')
            .then((res) => res.json())
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

            <div className="center">
                <img src={main.src} alt="main" />
            </div>

            <div className="side right" onClick={next}>
                <img src={right.src} alt="next" />
            </div>
        </div>
    );
}