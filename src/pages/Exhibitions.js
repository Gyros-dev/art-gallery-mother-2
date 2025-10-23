import React, { useEffect, useState } from 'react';
import '../styles/exhibitions.css';

export default function Exhibitions() {
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        fetch('/data/exhibitions.json') // путь относительно public/
            .then((res) => res.json())
            .then((data) => setExhibitions(data))
            .catch((err) => console.error('Ошибка загрузки выставок:', err));
    }, []);

    return (
        <section className="exhibition-list" id="exhibitions-list">
            {exhibitions.map((ex, index) => (
                <div key={index} className="exhibition-card">
                    <div className="exhibition-content">
                        <h2>{ex.title}</h2>
                        <p>
                            <strong>Когда:</strong> {ex.date}
                        </p>
                        <p>
                            <strong>Где:</strong> {ex.location}
                        </p>
                        <p>{ex.description}</p>
                    </div>
                    <div className="exhibition-arrow">→</div>
                </div>
            ))}
        </section>
    );
}