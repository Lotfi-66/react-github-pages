import React from 'react';
import StarryBackground from './StarryBackground';
import TechSphere from './components/TechSphere';
import VaisseauSpatial from './VaisseauSpatial';
import './App.css';

function App() {
    return (
        <div className="App">
            <StarryBackground />
            <header className="App-header">
                <h1>Lotfi Djeghbala</h1>
                <p>
                    Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur
                    web fullstack passionné.
                    Je maîtrise à la fois le front-end et le back-end, ce qui me permet
                    de créer des applications web complètes et performantes.
                </p>
            </header>
            <div className="TechSphere">
            <TechSphere />
            </div>
            <div className="projects-column">
                <section className="projects-section">
                </section>
            </div>
            <VaisseauSpatial />
        </div>
    );
}

export default App;