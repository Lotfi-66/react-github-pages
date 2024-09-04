import React, { useState, useEffect } from 'react';
import StarryBackground from './components/StarryBackground';
import TechSphere from './components/TechSphere';
import VaisseauSpatial from './components/VaisseauSpatial';
import TypewriterText from './components/TypewriterText';
import {
    ProjectsSection,
    ProjectTitle,
    ProjectList,
    ProjectItem,
    ProjectImage,
    Modal,
    ModalContent,
    CloseButton,
    StyledHeader,
    StyledTitle,
    StyledHeaderText,
    GlobalStyle,
} from './components/StyledComponents';
import './css/App.css';

function App() {
    console.log("App component rendered");

    const [showSecondText, setShowSecondText] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentProject, setCurrentProject] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        console.log("App component mounted");

        const preventZoom = (e) => {
            if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0')) {
                e.preventDefault();
            }
        };

        const preventDoubleTapZoom = (event) => {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        };

        const preventWheelZoom = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        let lastTouchEnd = 0;
        document.addEventListener('gesturestart', e => e.preventDefault());
        document.addEventListener('touchend', preventDoubleTapZoom, false);
        document.addEventListener('wheel', preventWheelZoom, { passive: false });
        document.addEventListener('keydown', preventZoom);

        const handleResize = () => {
            const newIsMobile = window.innerWidth <= 480;
            console.log('Window resized. Is mobile:', newIsMobile);
            setIsMobile(newIsMobile);
        };

        handleResize(); // Log initial state
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('gesturestart', e => e.preventDefault());
            document.removeEventListener('touchend', preventDoubleTapZoom);
            document.removeEventListener('wheel', preventWheelZoom);
            document.removeEventListener('keydown', preventZoom);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const projects = [
        {
            name: 'DragonBall Api',
            description: 'Description du projet 1',
            image: process.env.PUBLIC_URL + '/img/DBZAPI.png',
            fullDescription: 'Description complète du projet 1',
            creationDate: '01/01/2023'
        },
        {
            name: 'Airbnb Clone',
            description: 'Description du projet 2',
            image: process.env.PUBLIC_URL + '/img/Airbnb_clone.png',
            fullDescription: 'Description complète du projet 2',
            creationDate: '01/03/2023'
        },
        {
            name: 'Papa Pizza',
            description: 'Description du projet 3',
            image: process.env.PUBLIC_URL + '/img/PapaPizza.png',
            fullDescription: 'Description complète du projet 3',
            creationDate: '01/06/2023'
        },
    ];

    const headerText = `J'ai 21 ans, je suis un développeur web fullstack passionné. Je suis en cours de maîtrise du front-end, back-end, ce qui me permet de créer des applications web complètes et performantes.`;
    const additionalText = `Pour me contacter CLIQUEZ SUR le Vaisseau Spatial.`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondText(true);
            console.log("Second text shown");
        }, headerText.length * 30 + 1000);

        return () => clearTimeout(timer);
    }, [headerText.length]);

    useEffect(() => {
        console.log("Current project changed:", currentProject);
    }, [currentProject]);

    const handleTouchStart = (e) => {
        const touchStartX = e.touches[0].clientX;
        e.target.dataset.touchStartX = touchStartX;
    };

    const handleTouchMove = (e) => {
        if (!e.target.dataset.touchStartX) return;
        const touchEndX = e.touches[0].clientX;
        const touchStartX = parseFloat(e.target.dataset.touchStartX);
        if (touchStartX - touchEndX > 50) {
            // Swipe Left
            setCurrentProject((prev) => (prev + 1) % projects.length);
            e.target.dataset.touchStartX = null;
        } else if (touchEndX - touchStartX > 50) {
            // Swipe Right
            setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
            e.target.dataset.touchStartX = null;
        }
    };

    return (
        <>
            <GlobalStyle />
            <div className="App">
                <StarryBackground className="background" />
                <header className="header">
                    <StyledHeader>
                        <StyledTitle className="title">Djeghbala Lotfi</StyledTitle>
                        <StyledHeaderText className="header-text">
                            <TypewriterText text={headerText} speed={30} className="typewriter" />
                            {showSecondText && <TypewriterText text={additionalText} speed={30} className="typewriter additional" />}
                        </StyledHeaderText>
                    </StyledHeader>
                </header>
                <section className="tech-sphere-section">
                    <div className="TechSphere">
                        <TechSphere />
                    </div>
                </section>
                <section className="projects-section">
                    <ProjectsSection>
                        <ProjectTitle className="section-title">Mes Projets</ProjectTitle>
                        <ProjectList 
                            className="project-list"
                            style={{ transform: `translateX(-${currentProject * 100}%)`, transition: 'transform 0.3s ease' }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            {projects.map((project, index) => (
                                <ProjectItem key={index} className="project-item">
                                    <h3 className="project-name">{project.name}</h3>
                                    <ProjectImage
                                        className="project-image"
                                        src={project.image}
                                        alt={project.name}
                                        onClick={() => setSelectedProject(project)}
                                    />
                                </ProjectItem>
                            ))}
                        </ProjectList>
                    </ProjectsSection>
                </section>
                {selectedProject && (
                    <div className="modal-overlay">
                        <Modal className="modal">
                            <ModalContent className="modal-content">
                                <h2 className="modal-title">{selectedProject.name}</h2>
                                <p className="modal-description">{selectedProject.fullDescription}</p>
                                <p className="modal-date">Date de création : {selectedProject.creationDate}</p>
                                <CloseButton className="modal-close" onClick={() => setSelectedProject(null)}>×</CloseButton>
                            </ModalContent>
                        </Modal>
                    </div>
                )}
                <VaisseauSpatial />
            </div>
        </>
    );
}

export default App;