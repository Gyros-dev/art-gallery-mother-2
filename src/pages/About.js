import React from 'react';
import '../styles/about.css';
import artistPhoto from '../images/other/artist.jpg'; // поменяй путь на свой реальный файл

export default function About() {
    return (
        <section className="about-section">
            <div className="about-text">
                <h1>Анна Векслер</h1>
                <p>
                    Анна Векслер — современный художник, чьи работы исследуют свет, форму и движение.
                    В её картинах отражаются внутренние состояния, эмоции и философия гармонии.
                    Её творчество сочетает минимализм и экспрессию, позволяя зрителю увидеть
                    глубину в простых линиях и цветах.
                </p>
                <p>
                    Анна участвовала в ряде персональных и коллективных выставок, её работы находятся
                    в частных коллекциях по всему миру. В её произведениях заметна тяга к свету,
                    пространству и ощущению покоя.
                </p>
            </div>

            <div className="about-image">
                <img src={artistPhoto} alt="Анна Векслер" />
            </div>

            <div className="contact-block">
                <h2>Контакты</h2>
                <p>
                    Email: <a href="mailto:info@annavexler.art">info@annavexler.art</a>
                </p>
                <p>
                    Instagram: <a href="https://instagram.com/annavexler" target="_blank" rel="noreferrer">@annavexler</a>
                </p>
            </div>
        </section>
    );
}