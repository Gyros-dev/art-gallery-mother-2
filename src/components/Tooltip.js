import React from 'react';
import '../styles/tooltip.css';

export default function Tooltip({ text, visible }) {
    return (
        <div className="tooltip-wrapper">
            <div className="tooltip" style={{ opacity: visible ? 1 : 0 }}>
                {text}
            </div>
        </div>
    );
}

