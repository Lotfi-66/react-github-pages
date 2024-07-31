// src/App.js
import React from 'react';
import StarryBackground from './StarryBackground';
import { FaReact, FaJs, FaGithub, FaPhp, FaBootstrap, FaLinkedin } from 'react-icons/fa';
import TechSphere from './components/TechSphere';
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
                <section className="about-section">
                    <h3>À propos de moi</h3>
                    <p>Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur web fullstack passionné. Je maîtrise à la fois le front-end et le back-end, ce qui me permet de créer des applications web complètes et performantes.</p>
                </section>
                <section className="skills-section">
                    <h3>Mes compétences</h3>
                    <div className="skills specific-container">
                        <TechSphere />
                    </div>
                </section>
                <section className="projects-section">
                    <h3>Mes projets</h3>
                    <ul>
                        <li>Site Airbnb - PHP Orienté Objet/Bootstrap</li>
                        <li>PapaPizza - Php Procedural/Bootstrap</li>
                        <li>100&or - JavaScript Orienté Objet/Bootstrap</li>
                    </ul>
                </section>
                <section className="contact-section">
                    <h4>Contact</h4>
                    <p>Email: lotfi.djeg@gmail.com</p>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/lotfi-djeghbala-63160a266" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://github.com/Lotfi-66" target="_blank" rel="noopener noreferrer">
                            <FaGithub /> GitHub
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
