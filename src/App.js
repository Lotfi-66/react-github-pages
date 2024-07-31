// src/App.js
import React from 'react';
import StarryBackground from './StarryBackground';
import './App.css';

function App() {
    return (
        <div className="App">
            <StarryBackground />
            <header className="App-header">
                <h1>Mon Portfolio</h1>
            </header>
            <main>
                <section>
                    <h2>À propos de moi</h2>
                    <p>Je suis un développeur passionné par la création d'expériences web uniques.</p>
                </section>
                <section>
                    <h2>Mes projets</h2>
                    <ul>
                        <li>Projet 1</li>
                        <li>Projet 2</li>
                        <li>Projet 3</li>
                    </ul>
                </section>
                <section>
                    <h2>Contact</h2>
                    <p>Email: exemple@email.com</p>
                </section>
            </main>
        </div>
    );
}

export default App;
