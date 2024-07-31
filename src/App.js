import React from 'react';
import StarryBackground from './StarryBackground';
import { FaReact, FaJs, FaGithub, FaPhp, FaBootstrap, FaLinkedin } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { TagCloud } from 'react-tagcloud';
import './App.css';

function App() {
    const skillsData = [
        { value: 'React', count: 25, key: 'react' },
        { value: 'JavaScript', count: 18, key: 'js' },
        { value: 'PHP', count: 30, key: 'php' },
        { value: 'Bootstrap', count: 20, key: 'bootstrap' },
        { value: 'GitHub', count: 15, key: 'github' },
    ];

    const customRenderer = (tag, size, color) => {
        const fontSize = size + 'px';
        const key = tag.key;
        let icon;

        switch (key) {
            case 'react':
                icon = <FaReact />;
                break;
            case 'js':
                icon = <FaJs />;
                break;
            case 'php':
                icon = <FaPhp />;
                break;
            case 'bootstrap':
                icon = <FaBootstrap />;
                break;
            case 'github':
                icon = <FaGithub />;
                break;
            default:
                icon = null;
        }

        return (
            <span key={tag.value} style={{ fontSize, margin: '3px', display: 'inline-block' }}>
                {icon}
            </span>
        );
    };

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
                    <p>Je m'appelle Lotfi Djeghbala, j'ai 21 ans et je suis un développeur <br></br>
                        web fullstack passionné. Je maîtrise à la fois le front-end et le back-end,<br></br>
                        ce qui me permet de créer des applications web complètes et performantes.</p>
                </section>
                <section>
                    <h3>Mes compétences</h3>
                    <div className="skills">
                        <div className="skills-static">
                            <FaReact title="React" />
                            <FaJs title="JavaScript" />
                            <FaPhp title="PHP" />
                            <FaBootstrap title="Bootstrap" />
                            <FaGithub title="GitHub" />
                        </div>
                        <div className="skills-sphere">
                            <TagCloud
                                minSize={12}
                                maxSize={35}
                                tags={skillsData}
                                renderer={customRenderer}
                                onClick={tag => console.log('clicking on tag:', tag)}
                            />
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Mes projets</h3>
                    <ul>
                        <li>Site Airbnb - PHP Orienté Objet/Bootstrap</li>
                        <li>PapaPizza - Php Procedural/Bootstrap</li>
                        <li>100&or - JavaScript Orienté Objet/Bootstrap</li>
                    </ul>
                </section>
                <section>
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
