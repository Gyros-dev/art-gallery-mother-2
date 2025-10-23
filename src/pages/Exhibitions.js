import React, { useEffect, useState } from 'react';
import '../styles/exhibitions.css';
import '../styles/overlay.css';

export default function Exhibitions() {
    const [exhibitions, setExhibitions] = useState([]);
    const [iframeUrl, setIframeUrl] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch('/data/exhibitions.json')
            .then((res) => res.json())
            .then((data) => setExhibitions(data))
            .catch((err) => console.error('Ошибка загрузки выставок:', err));
    }, []);

    const openPreview = (url) => {
        if (url.startsWith('http')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            setIframeUrl(url);
            setVisible(true);
        }
    };

    const closePreview = () => {
        setVisible(false);
        setIframeUrl('');
    };

    return (
        <main className="content">
            <section>
                <h2>Текущие и будущие выставки</h2>
                <div className="exhibition-list">
                    {exhibitions
                        .filter((ex) => ex.status !== 'past')
                        .map((ex, i) => (
                            <article
                                key={i}
                                className={`exhibition-card ${ex.url ? 'clickable' : ''}`}
                                onClick={() => ex.url && openPreview(ex.url)}
                            >
                                <div className="exhibition-content">
                                    <h2>{ex.title}</h2>
                                    <p className="exhibition-date">{ex.date}</p>
                                    <p className="exhibition-location">{ex.location}</p>
                                    <p className="exhibition-description">{ex.description}</p>
                                </div>
                                <div className="exhibition-arrow">→</div>
                            </article>
                        ))}
                </div>
            </section>

            <section id="archive-section">
                <h2>Архив</h2>
                <div className="exhibition-list collapsed">
                    {exhibitions
                        .filter((ex) => ex.status === 'past')
                        .map((ex, i) => (
                            <article
                                key={i}
                                className={`exhibition-card ${ex.url ? 'clickable' : ''}`}
                                onClick={() => ex.url && openPreview(ex.url)}
                            >
                                <div className="exhibition-content">
                                    <h2>{ex.title}</h2>
                                    <p className="exhibition-date">{ex.date}</p>
                                    <p className="exhibition-location">{ex.location}</p>
                                    <p className="exhibition-description">{ex.description}</p>
                                </div>
                                <div className="exhibition-arrow">→</div>
                            </article>
                        ))}
                </div>
            </section>

            {visible && (
                <div id="preview-overlay" onClick={(e) => e.target.id === 'preview-overlay' && closePreview()}>
                    <div id="preview-close" onClick={closePreview}>
                        ×
                    </div>
                    <iframe
                        id="preview-frame"
                        src={iframeUrl}
                        title="Exhibition preview"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </main>
    );
}