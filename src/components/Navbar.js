import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div className="nav-content">
                    <span className="logo">Анна Векслер</span>
                    <div className="nav-links">
                        <Link to="/gallery">Галерея</Link>
                        <Link to="/exhibitions">Выставки</Link>
                        <Link to="/literature">Литература</Link>
                        <Link to="/about">Художник</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;