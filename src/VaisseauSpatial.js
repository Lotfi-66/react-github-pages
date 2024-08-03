import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './VaisseauSpatial.css';

const VaisseauSpatial = () => {
    const [showContact, setShowContact] = useState(false);
    const mountRef = useRef(null);
    const animationRef = useRef(null);
    const timeRef = useRef(0);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const clickableBoxRef = useRef(null);

    const openEmailClient = () => {
        const email = 'lotfi.djeg@gmail.com';
        const subject = 'Contact depuis le site web';
        const body = 'Bonjour,';
    
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const toggleContactInfo = () => {
        setShowContact(!showContact);
    };

    useEffect(() => {
        const mountNode = mountRef.current;
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountNode.appendChild(renderer.domElement);

        let vaisseauBoundingBox;

        // Charger le modèle 3D du vaisseau spatial
        const objLoader = new OBJLoader();
        objLoader.load(
            process.env.PUBLIC_URL + '/models/3d-model.obj',
            (object) => {
                object.scale.set(0.004, 0.006, 0.0009);

                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x888888,
                            metalness: 0.8,
                            roughness: 0.4,
                            envMapIntensity: 9,
                        });
                    }
                });

                scene.add(object);
                animationRef.current = object;

                // Calculer la boîte englobante du vaisseau
                vaisseauBoundingBox = new THREE.Box3().setFromObject(object);

                // Créer une boîte cliquable invisible autour du vaisseau
                const boxSize = vaisseauBoundingBox.getSize(new THREE.Vector3());
                const boxGeometry = new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z);
                const boxMaterial = new THREE.MeshBasicMaterial({ visible: false });
                const clickableBox = new THREE.Mesh(boxGeometry, boxMaterial);
                clickableBox.position.copy(object.position);
                scene.add(clickableBox);
                clickableBoxRef.current = clickableBox;
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

            if (animationRef.current && clickableBoxRef.current) {
                timeRef.current += 0.005;
                const t = timeRef.current;

                const width = window.innerWidth;
                const height = window.innerHeight;
                const a = width / 5;
                const b = height / 8;

                const x = a * Math.sin(t);
                const y = b * Math.sin(t) * Math.cos(t);

                animationRef.current.position.set(x, y, 0);
                clickableBoxRef.current.position.set(x, y, 0);

                const tangentX = a * Math.cos(t);
                const tangentY = b * (Math.cos(t) * Math.cos(t) - Math.sin(t) * Math.sin(t));
                const angle = Math.atan2(tangentY, tangentX);

                const rotationZ = angle - Math.PI / 2;
                const rotationY = timeRef.current * 0.004;
                const rotationX = Math.sin(t * 2) * 0.5;

                animationRef.current.rotation.z = rotationZ;
                animationRef.current.rotation.y += 0.004;
                animationRef.current.rotation.x = rotationX;

                clickableBoxRef.current.rotation.copy(animationRef.current.rotation);
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

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(clickableBoxRef.current);

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        };

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(clickableBoxRef.current);

            if (intersects.length > 0) {
                toggleContactInfo();
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onMouseClick);
            mountNode.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} className="vaisseau-spatial">
            {showContact && (
                <div className="contact-overlay">
                    <div className="contact-modal">
                        <h2>Contactez-moi</h2>
                        <p>Email : lotfi.djeg@gmail.com</p>
                        <p>Téléphone : +33 6 45 84 88 53</p>
                        <button onClick={openEmailClient}>Envoyer un email</button>
                        <button onClick={toggleContactInfo}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VaisseauSpatial;