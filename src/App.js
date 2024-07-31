import React from 'react';
import StarryBackground from './StarryBackground';
import './App.css';

function App() {
    return (
        <div className="App">
            <StarryBackground />
            <div className="content">
                <header className="App-header">
                    <h1>Lotfi Djeghbala</h1>
                    <p className="subtitle">Développeur Web Fullstack</p>
                </header>
                <main>
                    <section>
                        <h2>À propos de moi</h2>
                        <p>Je suis un développeur web fullstack passionné de 21 ans. Je maîtrise le front-end et le back-end, créant des applications web complètes et performantes.</p>
                    </section>
                    <section>
                        <h2>Compétences</h2>
                        <p>React, JavaScript, PHP, PHP POO, Bootstrap, GitHub</p>
                    </section>
                    <section>
                        <h2>Projets</h2>
                        <ul>
                            <li>Application React avec backend PHP</li>
                            <li>Site e-commerce en JavaScript et Bootstrap</li>
                            <li>API RESTful en PHP orienté objet</li>
                        </ul>
                    </section>
                    <section>
                        <h2>Contact</h2>
                        <p>lotfi.djeg@gmail.com</p>
                        <p><a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/votre-profil" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default App;
