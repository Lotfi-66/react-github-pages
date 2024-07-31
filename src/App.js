// src/App.js
import React from 'react';
import StarryBackground from './StarryBackground';
import { FaReact, FaJs, FaGithub, FaPhp, FaBootstrap, FaLinkedin } from 'react-icons/fa';
import TechSphere from './components/TechSphere';
import './App.css';

function App() {
    return (
        <div className="App container-fluid">
            <StarryBackground />
            <header className="App-header text-center py-4">
                <h2>Lotfi Djeghbala</h2>
                <p>Développeur Web Fullstack</p>
            </header>
            <main className="row">
                <section className="col-12 col-md-6 mb-4">
                    <h3>À propos de moi</h3>
                    <p>Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur web fullstack passionné. Je maîtrise à la fois le front-end et le back-end, ce qui me permet de créer des applications web complètes et performantes.</p>
                </section>
                <section className="col-12 col-md-6 mb-4">
                    <h3>Mes compétences</h3>
                    <div className="skills specific-container d-flex justify-content-center">
                        <TechSphere />
                    </div>
                </section>
                <section className="col-12 col-md-6 mb-4">
                    <h3>Mes projets</h3>
                    <ul>
                        <li>Site Airbnb - PHP Orienté Objet/Bootstrap</li>
                        <li>PapaPizza - Php Procedural/Bootstrap</li>
                        <li>100&or - JavaScript Orienté Objet/Bootstrap</li>
                    </ul>
                </section>
                <section className="col-12 col-md-6 mb-4">
                    <h4>Contact</h4>
                    <p>Email: lotfi.djeg@gmail.com</p>
                    <div className="social-links d-flex justify-content-center">
                        <a href="https://www.linkedin.com/in/lotfi-djeghbala-63160a266" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mx-2">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://github.com/Lotfi-66" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mx-2">
                            <FaGithub /> GitHub
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
