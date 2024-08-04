import React, { useState, useEffect } from 'react';
import StarryBackground from './StarryBackground';
import TechSphere from './components/TechSphere';
import VaisseauSpatial from './VaisseauSpatial';
import TypewriterText from './TypewriterText';
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
    StyledHeaderText 
} from './StyledComponents';
import './App.css';

function App() {
    const [showSecondText, setShowSecondText] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        { 
            name: 'DragonBall Api', 
            description: 'Description du projet 1',
            image: process.env.PUBLIC_URL + '/DBZAPI.png',
            fullDescription: 'Description complète du projet 1',
            creationDate: '01/01/2023'
        },
        { 
            name: 'Airbnb Clone', 
            description: 'Description du projet 2',
            image: process.env.PUBLIC_URL + '/Airbnb_clone.png',
            fullDescription: 'Description complète du projet 2',
            creationDate: '01/03/2023'
        },
        { 
            name: 'Papa Pizza', 
            description: 'Description du projet 3',
            image: process.env.PUBLIC_URL + '/PapaPizza.png', // Chemin correct pour l'image
            fullDescription: 'Description complète du projet 3',
            creationDate: '01/06/2023'
        },
    ];

    const headerText = `J'ai 21 ans, je suis un développeur
web fullstack passionné.
Je suis en cours de maîtrise du front-end, back-end, ce qui me permet
de créer des applications web complètes et performantes.`;

    const additionalText = `Pour me contacter CLIQUEZ SUR le Vaisseau Spatial.`;

    const delay = headerText.length * 30 + 1000;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondText(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className="App">
            <StarryBackground />
            <StyledHeader>
                <StyledTitle>Djeghbala Lotfi</StyledTitle>
                <StyledHeaderText>
                    <TypewriterText text={headerText} speed={30} />
                    {showSecondText && <TypewriterText text={additionalText} speed={30} />}
                </StyledHeaderText>
            </StyledHeader>
            
            <div className="TechSphere">
                <TechSphere />
            </div>
            
            <ProjectsSection>
                <ProjectTitle>Mes Projets</ProjectTitle>
                <ProjectList>
                    {projects.map((project, index) => (
                        <ProjectItem key={index}>
                            <h3>{project.name}</h3>
                            <ProjectImage 
                                src={project.image} 
                                alt={project.name}
                                onClick={() => setSelectedProject(project)}
                            />
                        </ProjectItem>
                    ))}
                </ProjectList>
            </ProjectsSection>
            
            {selectedProject && (
                <Modal>
                    <ModalContent>
                        <h2>{selectedProject.name}</h2>
                        <p>{selectedProject.fullDescription}</p>
                        <p>Date de création : {selectedProject.creationDate}</p>
                        <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
                    </ModalContent>
                </Modal>
            )}
            
            <VaisseauSpatial />
        </div>
    );
}

export default App;
