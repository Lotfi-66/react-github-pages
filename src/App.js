import React from 'react';
import StarryBackground from './StarryBackground';
import TechSphere from './components/TechSphere';
import VaisseauSpatial from './VaisseauSpatial';
import './App.css';

function App() {
    const handleVaisseauClick = () => {
        alert('Vaisseau spatial cliqué !');
    };

    return (
        <div className="App">
            <StarryBackground />
            <header className="App-header">
                <h1>Lotfi Djeghbala</h1>
                <p>Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur
                    web fullstack passionné. <br />
                    Je maîtrise à la fois le front-end et le back-end, ce qui me permet <br />
                    de créer des applications web complètes et performantes.</p>
            </header>
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="center-column">
                        <TechSphere />
                    </div>
                    <div className="left-column">
                        <section className="projects-section">
                            <h2>Mes projets</h2>
                            <ul>
                                <li>ProjetProjet 3 - API RESTful en PHP orienté objet 1 - Application React avec backend PHP</li>
                                <li>Projet 2 - Site e-commerce en JavaScript et Bootstrap</li>
                                <li>Projet 3 - API RESTful en PHP orienté objet</li>
                            </ul>
                        </section>
                    </div>
                </div>
                <VaisseauSpatial/>
            </main>
        </div>
    );
}

export default App;
