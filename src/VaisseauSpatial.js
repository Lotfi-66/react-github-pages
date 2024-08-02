import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './VaisseauSpatial.css';

const VaisseauSpatial = ({ onClick }) => {
    const mountRef = useRef(null);
    const vaisseauDivRef = useRef(null);
    const animationRef = useRef(null);
    const timeRef = useRef(0);

    useEffect(() => {
        const mountNode = mountRef.current;
        const vaisseauDiv = vaisseauDivRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountNode.appendChild(renderer.domElement);

        // Charger le modèle 3D du vaisseau spatial
        const objLoader = new OBJLoader();
        objLoader.load(
            process.env.PUBLIC_URL + '/models/3d-model.obj',
            (object) => {
                object.scale.set(0.006, 0.006, 0.0008);

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
        frontLight.position.set(1, 1, 1);
        scene.add(frontLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
        backLight.position.set(-1, 1, 1);
        scene.add(backLight);

        camera.position.z = 550;

        const animate = () => {
            requestAnimationFrame(animate);

            if (animationRef.current) {
                timeRef.current += 0.005;
                const t = timeRef.current;

                const width = window.innerWidth;
                const height = window.innerHeight;
                const a = width / 5;
                const b = height / 8;

                const x = a * Math.sin(t);
                const y = b * Math.sin(t) * Math.cos(t);

                animationRef.current.position.set(x, y, 0);

                // Mettre à jour la position de la div cliquable
                const vector = new THREE.Vector3(x, y, 0);
                vector.project(camera);
                const xx = (vector.x * 0.5 + 0.5) * width;
                const yy = (-(vector.y * 0.5) + 0.5) * height;
                vaisseauDiv.style.transform = `translate(${xx}px, ${yy}px)`;

                const tangentX = a * Math.cos(t);
                const tangentY = b * (Math.cos(t) * Math.cos(t) - Math.sin(t) * Math.sin(t));
                const angle = Math.atan2(tangentY, tangentX);

                animationRef.current.rotation.z = angle - Math.PI / 2;
                animationRef.current.rotation.y += 0.004;
                animationRef.current.rotation.x = Math.sin(t * 2) * 0.5;
            }

            renderer.render(scene, camera);
        };

        animate();

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
            mountNode.removeChild(renderer.domElement);
        };
    }, [onClick]);

    return (
        <div ref={mountRef} className="vaisseau-spatial">
            <div 
                ref={vaisseauDivRef} 
                className="vaisseau-clickable"
                onClick={onClick}
                style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '-30px',
                    transform: 'translate(-50%, -50%)',
                    width: '150px',
                    height: '150px',
                    cursor: 'pointer',
                    background: 'transparent',
                }}
            />
        </div>
    );
};

export default VaisseauSpatial;