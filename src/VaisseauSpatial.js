import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './VaisseauSpatial.css';

const VaisseauSpatial = ({ onClick }) => {
    const mountRef = useRef(null);
    const animationRef = useRef(null);
    const timeRef = useRef(0);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    useEffect(() => {
        const mountNode = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountNode.appendChild(renderer.domElement);

        let vaisseau = null;

        // Charger le modèle 3D du vaisseau spatial
        const objLoader = new OBJLoader();
        objLoader.load(
            process.env.PUBLIC_URL + '/models/3d-model.obj', // Assurez-vous que ce chemin est correct
            (object) => {
                object.scale.set(0.006, 0.006, 0.0008); // Ajustez si nécessaire

                // Appliquer un matériau métallique
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x888888,
                            metalness: 0.8,
                            roughness: 0.4,
                            envMapIntensity: 5,
                        });
                    }
                });

                scene.add(object);
                vaisseau = object;
                animationRef.current = object;
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% chargé');
            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement du modèle', error);
            }
        );

        // Lumières
        const ambientLight = new THREE.AmbientLight(0x404040, 0.9);
        scene.add(ambientLight);

        const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLight.position.set(1, 1, 1); // Lumière venant du haut à droite
        scene.add(frontLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
        backLight.position.set(-1, 1, 1); // Lumière venant du haut à droite
        scene.add(backLight);

        // Positionner la caméra
        camera.position.z = 550;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            if (animationRef.current) {
                // Incrémentation du temps
                timeRef.current += 0.001;
                const t = timeRef.current;

                // Paramètres du mouvement en 8
                const a = 75; // Taille du 8
                const b = 400; // Largeur du 8

                // Calcul de la position sur le trajet en 8
                const x = a * Math.sin(t);
                const y = b * Math.sin(t) * Math.cos(t);
                animationRef.current.position.set(x, y, 0);

                // Calcul de l'orientation du vaisseau dans la direction du mouvement
                const tangentX = a * Math.cos(t);
                const tangentY = b * (Math.cos(t) * Math.cos(t) - Math.sin(t) * Math.sin(t));
                const angle = Math.atan2(tangentY, tangentX);

                // Rotation autour de l'axe Z pour suivre la trajectoire
                animationRef.current.rotation.z = angle - Math.PI / 2;

                // Rotation continue autour de l'axe Y
                animationRef.current.rotation.y += 0.005; // Ajustez cette valeur pour contrôler la vitesse de rotation

                // Rotation autour de l'axe X pour un effet supplémentaire (optionnel)
                animationRef.current.rotation.x = Math.sin(t * 2) * 0.2; // Crée un léger basculement
            }

            renderer.render(scene, camera);
        };

        animate();

        // Gestion des clics
        const handleMouseClick = (event) => {
            const rect = mountNode.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 0.5;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 0.5;

            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObject(vaisseau, true);

            if (intersects.length > 0) {
                onClick();
            }
        };

        mountNode.addEventListener('click', handleMouseClick);

        // Gestion du redimensionnement
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountNode.removeEventListener('click', handleMouseClick);
            mountNode.removeChild(renderer.domElement);
        };
    }, [onClick]);

    return <div ref={mountRef} style={{ cursor: 'pointer', width: '100%', height: '100%', position: 'absolute' }} />;
};

export default VaisseauSpatial;
