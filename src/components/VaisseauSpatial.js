import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import '../css/VaisseauSpatial.css';

const VaisseauSpatial = () => {
    const [showContact, setShowContact] = useState(false);
    const mountRef = useRef(null);
    const animationRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const clickableBoxRef = useRef(null);
    const boxSizeRef = useRef(new THREE.Vector3());
    const clock = useRef(new THREE.Clock());

    const openEmailClient = useCallback(() => {
        const email = 'lotfi.djeg@gmail.com';
        const subject = 'Contact depuis le site web';
        const body = 'Bonjour,';
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, []);

    const openWhatsApp = useCallback(() => {
        const phoneNumber = '+33645848853';
        const message = 'Bonjour, je vous contacte depuis votre site web.';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
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

        window.open(url, '_blank');
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

        const mtlLoader = new MTLLoader();
        mtlLoader.load(
            process.env.PUBLIC_URL + '/models/SpaceShip.mtl',
            (materials) => {
                materials.preload();
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(
                    process.env.PUBLIC_URL + '/models/SpaceShip.obj',
                    (object) => {
                        object.scale.set(20, 20, 20);
                        object.position.set(0, 0, 0);
                        scene.add(object);
                        animationRef.current = object;

                        const vaisseauBoundingBox = new THREE.Box3().setFromObject(object);
                        boxSizeRef.current = vaisseauBoundingBox.getSize(new THREE.Vector3());

                        const boxGeometry = new THREE.BoxGeometry(boxSizeRef.current.x, boxSizeRef.current.y, boxSizeRef.current.z);
                        const boxMaterial = new THREE.MeshBasicMaterial({ visible: false });
                        const clickableBox = new THREE.Mesh(boxGeometry, boxMaterial);
                        clickableBox.position.copy(object.position);
                        scene.add(clickableBox);
                        clickableBoxRef.current = clickableBox;
                    },
                    (xhr) => console.log(`${(xhr.loaded / xhr.total * 100).toFixed(0)}% chargé`),
                    (error) => console.error('Erreur lors du chargement du modèle', error)
                );
            },
            (error) => console.error('Erreur lors du chargement des matériaux', error)
        );

        const ambientLight = new THREE.AmbientLight(0x404040, 0.9);
        scene.add(ambientLight);

        const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLight.position.set(1, 1, 1);
        scene.add(frontLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
        backLight.position.set(-1, 1, 1);
        scene.add(backLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        camera.position.z = 850;

        const animate = () => {
            requestAnimationFrame(animate);
            if (animationRef.current && clickableBoxRef.current) {
                const elapsedTime = clock.current.getElapsedTime();

                const a = 640;
                const b = 440;
                const omega = Math.PI / 30;

                animationRef.current.position.x = a * Math.sin(omega * elapsedTime);
                animationRef.current.position.y = b * Math.sin(omega * elapsedTime) * Math.cos(omega * elapsedTime);
                animationRef.current.position.z = 10 * Math.sin(omega * elapsedTime);

                animationRef.current.rotation.x += 0.0007;
                animationRef.current.rotation.y += 0.002;
                animationRef.current.rotation.z += 0.002;

                clickableBoxRef.current.position.copy(animationRef.current.position);
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
