import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Exhibitions from './pages/Exhibitions';
import Literature from './pages/Literature';
import About from './pages/About';

function Home() {
    return (
        <section>
            <h2>Главная</h2>
            <p>Добро пожаловать в онлайн-галерею Анны Векслер.</p>
        </section>
    );
}

function Footer() {
    return (
        <footer>
            <p>© {new Date().getFullYear()} Анна Векслер</p>
        </footer>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/exhibitions" element={<Exhibitions />} />
                    <Route path="/literature" element={<Literature />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;