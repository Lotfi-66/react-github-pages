import styled from 'styled-components';

export const ProjectsSection = styled.section`
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    right: 25px;
    width: 350px;
    max-height: 100vh;
    overflow-y: auto;
    z-index: -1; // Changé de -1 à 1 pour être visible
`;

export const ProjectTitle = styled.h2`
    font-size: 3.1em;
    margin-bottom: 20px;
    text-align: center;
    color: #FFD700; /* Gold color */
`;

export const ProjectList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ProjectItem = styled.li`
    margin: 30px 0;
    padding: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const ModalContent = styled.div`
    background-color: #fff;
    padding: 5px;
    border-radius: 60px;
    max-width: 500px;
    width: 90%;
    color: #000;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #fff;
`;

export const StyledHeader = styled.header`
    position: absolute;
    left: 100px;
    top: 250px;
    text-align: center;
    padding: 20px;
    max-width: 400px;
    z-index: -1;
`;

export const StyledTitle = styled.h1`
    margin-left: 0;
    font-size: 2.5em;
    margin-bottom: 35px;
    color: #FFD700;
`;

export const StyledHeaderText = styled.div`
    font-size: 1.5em;
    line-height: 1.09;
    color: white;
`;