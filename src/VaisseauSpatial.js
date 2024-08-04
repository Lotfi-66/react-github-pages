import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './VaisseauSpatial.css';

const VaisseauSpatial = () => {
    const [showContact, setShowContact] = useState(false);
    const mountRef = useRef(null);
    const animationRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const clickableBoxRef = useRef(null);
    const boxSizeRef = useRef(new THREE.Vector3());
    const velocityRef = useRef(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5));
    const speed = 0.1; // Vitesse du vaisseau
    const changeDirectionInterval = 5000; // Intervalle pour changer la direction en millisecondes

    const openEmailClient = useCallback(() => {
        const email = 'lotfi.djeg@gmail.com';
        const subject = 'Contact depuis le site web';
        const body = 'Bonjour,';
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, []);

    const openWhatsApp = useCallback(() => {
        const phoneNumber = '+33645848853'; // Numéro de téléphone avec le code du pays
        const message = 'Bonjour, je vous contacte depuis votre site web.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }, []);

    const saveContact = useCallback(() => {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Lotfi Djeg
TEL:+33645848853
EMAIL:lotfi.djeg@gmail.com
END:VCARD`;
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }, []);

    const toggleContactInfo = useCallback(() => {
        setShowContact(prev => !prev);
    }, []);

    useEffect(() => {
        const mountNode = mountRef.current;
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountNode.appendChild(renderer.domElement);

        // Charger le modèle 3D du vaisseau spatial
        const objLoader = new OBJLoader();
        objLoader.load(
            process.env.PUBLIC_URL + '/models/SpaceShip.obj',
            (object) => {
                object.scale.set(5, 4, 8); // Ajustez l'échelle si nécessaire
                object.position.set(0, 0, 0); // Assurez-vous que le modèle est positionné correctement
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            metalness: 0.1,
                            roughness: 0.1,
                            envMapIntensity: 1,
                        });
                    }
                });
                scene.add(object);
                animationRef.current = object;

                // Calculer la boîte englobante du vaisseau
                const vaisseauBoundingBox = new THREE.Box3().setFromObject(object);
                boxSizeRef.current = vaisseauBoundingBox.getSize(new THREE.Vector3());

                // Créer une boîte cliquable invisible autour du vaisseau
                const boxGeometry = new THREE.BoxGeometry(boxSizeRef.current.x, boxSizeRef.current.y, boxSizeRef.current.z);
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

        camera.position.z = 190; // Ajustez la position de la caméra si nécessaire

        const animate = () => {
            requestAnimationFrame(animate);
            if (animationRef.current && clickableBoxRef.current) {
                // Mise à jour de la position du vaisseau
                const position = animationRef.current.position;
                const velocity = velocityRef.current;

                // Déplacer le vaisseau
                position.addScaledVector(velocity, speed);

                // Changer la direction du vaisseau de manière aléatoire à intervalles réguliers
                if (performance.now() % changeDirectionInterval < 16) { // 16 ms pour une mise à jour approximative toutes les 5000 ms
                    velocityRef.current = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                }

                // Limiter la position du vaisseau à l'intérieur de l'écran
                const width = window.innerWidth;
                const height = window.innerHeight;
                const depth = 200; // Définir la profondeur de l'animation
                position.x = Math.max(-width / 2, Math.min(width / 2, position.x));
                position.y = Math.max(-height / 2, Math.min(height / 2, position.y));
                position.z = Math.max(-depth / 2, Math.min(depth / 2, position.z));

                // Ajouter une légère rotation sur l'axe Y pour un effet visuel
                animationRef.current.rotation.y += 0.0001;

                clickableBoxRef.current.position.copy(position);
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
            if (clickableBoxRef.current) {
                const intersects = raycaster.intersectObject(clickableBoxRef.current);
                document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
            }
        };

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            if (clickableBoxRef.current) {
                const intersects = raycaster.intersectObject(clickableBoxRef.current);
                if (intersects.length > 0) {
                    toggleContactInfo();
                }
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
    }, [toggleContactInfo]);

    return (
        <div ref={mountRef} className="vaisseau-spatial">
            {showContact && (
                <div className="contact-overlay">
                    <div className="contact-modal">
                        <h2>Contactez-moi</h2>
                        <p>Email : lotfi.djeg@gmail.com</p>
                        <p>Téléphone : +33 6 45 84 88 53</p>
                        <button onClick={openEmailClient}>Envoyer un email</button>
                        <button onClick={openWhatsApp}>Envoyer un message WhatsApp</button>
                        <button onClick={saveContact}>Enregistrer le contact</button>
                        <button onClick={toggleContactInfo}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VaisseauSpatial;
