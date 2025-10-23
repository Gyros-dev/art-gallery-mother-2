import React, { useState, useEffect } from 'react';
import '../styles/literature.css';
import '../styles/overlay.css';

export default function Literature() {
    const [pdfUrl, setPdfUrl] = useState('');
    const [visible, setVisible] = useState(false);

    const literatureList = [
        {
            title: 'Ручное ткачество. Учебно-методическое пособие',
            url: '/docs/AV_Ruchnoe_tkachestvo.pdf',
        },
        {
            title: 'Основы искусствоведения',
            url: '/docs/искусствоведение.pdf',
        },
        {
            title: 'Пособие по цветоведению',
            url: '/docs/пособие_по_цвету.pdf',
        },
    ];

    const openPdf = (url) => {
        setPdfUrl(url);
        setVisible(true);
    };

    const closePdf = () => {
        setVisible(false);
        setPdfUrl('');
    };

    // 🔹 Закрытие по клавише Esc
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && closePdf();
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <main className="content">
            <h1>Литературные материалы</h1>

            <ul className="literature-list">
                {literatureList.map((item, i) => (
                    <li key={i}>
                        <button
                            onClick={() => openPdf(item.url)}
                            className="link-button"
                        >
                            {item.title}
                        </button>
                    </li>
                ))}
            </ul>

            {visible && (
                <div id="pdf-overlay" onClick={(e) => e.target.id === 'pdf-overlay' && closePdf()}>
                    <div id="preview-close" onClick={closePdf}>
                        ×
                    </div>
                    <iframe id="pdf-viewer" src={pdfUrl} title="PDF Viewer" />
                </div>
            )}
        </main>
    );
}