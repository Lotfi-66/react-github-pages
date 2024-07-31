// src/App.js
import React from 'react';
import StarryBackground from './StarryBackground';
import { FaReact, FaJs, FaGithub, FaPhp, FaBootstrap, FaLinkedin } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import './App.css';

function App() {
    return (
        <div className="App">
            <StarryBackground />
            <header className="App-header">
                <h2>Lotfi Djeghbala</h2>
                <p>Développeur Web Fullstack</p>
            </header>
            <main>
                <section>
                    <h3>À propos de moi</h3>
                    <p>Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur web fullstack passionné. Je maîtrise à la fois le front-end et le back-end, ce qui me permet de créer des applications web complètes et performantes.</p>
                </section>
                <section>
                    <h3>Mes compétences</h3>
                    <div className="skills">
                        <FaReact title="React" />
                        <FaJs title="JavaScript" />
                        <SiJavascript title="JavaScript Objet" />
                        <FaPhp title="PHP" />
                        <FaPhp title="PHP POO" />
                        <FaBootstrap title="Bootstrap" />
                        <FaGithub title="GitHub" />
                    </div>
                </section>
                <section>
                    <h3>Mes projets</h3>
                    <ul>
                        <li>Projet 1 - Application React avec backend PHP</li>
                        <li>Projet 2 - Site e-commerce en JavaScript et Bootstrap</li>
                        <li>Projet 3 - API RESTful en PHP orienté objet</li>
                    </ul>
                </section>
                <section>
                    <h4>Contact</h4>
                    <p>Email: lotfi.djeg@gmail.com</p>
                    <div className="social-links">
                        <a href="https://linkedin.com/in/votre-profil-linkedin" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://github.com/votre-profil-github" target="_blank" rel="noopener noreferrer">
                            <FaGithub /> GitHub
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
