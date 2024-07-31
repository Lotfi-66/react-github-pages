import React from 'react';
import StarryBackground from './StarryBackground';
import { FaReact, FaJs, FaGithub, FaPhp, FaBootstrap, FaLinkedin } from 'react-icons/fa';
import TechSphere from './components/TechSphere';
import './App.css';

function App() {
    return (
        <>
            <StarryBackground />
            <div className="content-overlay">
                <div className="App container-fluid py-4">
                    <header className="App-header text-center mb-5">
                        <h1 className="display-4">Lotfi Djeghbala</h1>
                        <p className="lead">Développeur Web Fullstack</p>
                    </header>
                    <main className="row g-4">
                        <section className="col-12 col-md-6">
                            <div className="card h-100 bg-transparent border-0">
                                <div className="card-body">
                                    <h3 className="card-title">À propos de moi</h3>
                                    <p className="card-text">Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur web fullstack passionné. Je maîtrise à la fois le front-end et le back-end, ce qui me permet de créer des applications web complètes et performantes.</p>
                                </div>
                            </div>
                        </section>
                        <section className="col-12 col-md-6">
                            <div className="card h-100 bg-transparent border-0">
                                <div className="card-body">
                                    <h3 className="card-title">Mes compétences</h3>
                                    <div className="skills specific-container d-flex justify-content-center align-items-center h-100">
                                        <TechSphere />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="col-12 col-md-6">
                            <div className="card h-100 bg-transparent border-0">
                                <div className="card-body">
                                    <h3 className="card-title">Mes projets</h3>
                                    <ul className="list-group list-group-flush bg-transparent">
                                        <li className="list-group-item bg-transparent">Site Airbnb - PHP Orienté Objet/Bootstrap</li>
                                        <li className="list-group-item bg-transparent">PapaPizza - Php Procedural/Bootstrap</li>
                                        <li className="list-group-item bg-transparent">100&or - JavaScript Orienté Objet/Bootstrap</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="col-12 col-md-6">
                            <div className="card h-100 bg-transparent border-0">
                                <div className="card-body">
                                    <h3 className="card-title">Contact</h3>
                                    <p className="card-text">Email: lotfi.djeg@gmail.com</p>
                                    <div className="social-links d-flex justify-content-center">
                                        <a href="https://www.linkedin.com/in/lotfi-djeghbala-63160a266" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light me-2">
                                            <FaLinkedin className="me-2" /> LinkedIn
                                        </a>
                                        <a href="https://github.com/Lotfi-66" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                                            <FaGithub className="me-2" /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
