import React, { useEffect, useRef, useState } from 'react';
import { FaReact, FaJs, FaPhp, FaBootstrap, FaGithub, FaFigma, FaLinux, FaCss3Alt, FaHtml5, FaCube, FaCode, FaTerminal } from 'react-icons/fa';
import * as THREE from 'three';
import '../css/TechSphere.css';

const TechSphere = React.memo(() => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const aspect = container.clientWidth / container.clientHeight;
        const frustumSize = isMobile ? 15 : 10;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2, frustumSize * aspect / 2,
            frustumSize / 2, frustumSize / -2,
            0.9, 1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Création de la Terre
        const earthScale = isMobile ? 0.8 : 1.24;
        const earthGeometry = new THREE.SphereGeometry(earthScale, 32, 32);
        const earthTexture = new THREE.TextureLoader().load('https://live.staticflickr.com/2521/3884071286_0b6ddb55dd_h.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            roughness: 0.6,
            metalness: 0.1
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.castShadow = true;
        earth.receiveShadow = true;
        earth.position.y = isMobile ? 0.5 : 1;
        earth.rotation.z = THREE.MathUtils.degToRad(23.5); // Inclinaison réaliste de la Terre
        scene.add(earth);

        // Création de la Lune
        const moonScale = isMobile ? 0.15 : 0.25;
        const moonGeometry = new THREE.SphereGeometry(moonScale, 75, 75);
        const moonTexture = new THREE.TextureLoader().load('https://qph.cf2.quoracdn.net/main-qimg-916f32b07154a07addd64550591ec418-lq');
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            roughness: 25,
            metalness: 0
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.castShadow = false; // La Lune ne doit pas projeter d'ombre sur la Terre
        moon.receiveShadow = true;
        scene.add(moon);

        // Lumières
        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
        sunLight.position.set(10, 10, 10); // Position réaliste pour simuler le soleil
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 1;
        sunLight.shadow.camera.far = 50;
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        camera.position.set(1, 5, 15);
        camera.lookAt(new THREE.Vector3(-0.5, -1.5, 0));

        // Animations
        const animateEarth = () => {
            earth.rotation.y += 0.005;
        };

        let moonAngle = 0;
        const moonOrbitRadius = isMobile ? 1.5 : 2;
        const moonOrbitSpeed = 0.001;
        const animateMoon = () => {
            moonAngle += moonOrbitSpeed;
            const moonX = Math.sin(moonAngle) * moonOrbitRadius * 3.76;
            const moonY = Math.cos(moonAngle) * moonOrbitRadius * 3.1;
            const moonZ = Math.cos(moonAngle) * moonOrbitRadius * 2.5; // Ajustement pour une orbite plus réaliste
            moon.position.set(earth.position.x + moonX, earth.position.y + moonY, earth.position.z + moonZ);
            moon.rotation.y += 0.01;
        };

        const icons = container.querySelectorAll('.icon');
        const totalIcons = icons.length;
        const radius = isMobile ? 2 : 2.8;
        let angle = 0;
        const angleStep = (2 * Math.PI) / totalIcons;

        const animateIcons = () => {
            angle += 0.002;
            icons.forEach((icon, i) => {
                const x = radius * Math.cos(angle + i * angleStep);
                const y = radius * Math.sin(angle + i * angleStep);
                const z = radius * Math.sin(angle + i * angleStep) * 3;

                // Calculer le centre du conteneur
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;

                // Appliquer la transformation en tenant compte du centre
                const scale = isMobile ? 0.7 : 0.9;
                icon.style.transform = `translate3d(${x * 100 + centerX}px, ${y * 15 + centerY}px, ${z * 100}px) scale(${scale})`;
                icon.style.zIndex = z > 0 ? 1 : -1;
            });
        };

        const animate = () => {
            animateEarth();
            animateMoon();
            animateIcons();
            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const resizeHandler = () => {
            const newIsMobile = window.innerWidth <= 768;
            setIsMobile(newIsMobile);

            const aspect = container.clientWidth / container.clientHeight;
            const newFrustumSize = (newIsMobile ? 15 : 10) * 1.5;
            camera.left = -newFrustumSize * aspect / 2;
            camera.right = newFrustumSize * aspect / 2;
            camera.top = newFrustumSize / 2;
            camera.bottom = -newFrustumSize / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeHandler);
            container.removeChild(renderer.domElement);
        };
    }, [isMobile]);

    return (
        <div className="tech-sphere-container" ref={containerRef}>
            <div className="tech-sphere">
                <FaReact className="icon" />
                <FaJs className="icon" />
                <FaPhp className="icon" />
                <FaBootstrap className="icon" />
                <FaGithub className="icon" />
                <FaFigma className="icon" />
                <FaLinux className="icon" />
                <FaCss3Alt className="icon" />
                <FaHtml5 className="icon" />
                <FaCube className="icon" title="Three.js" />
                <FaCode className="icon" title="Postman" />
                <FaTerminal className="icon" title="Bash" />
            </div>
        </div>
    );
});

export default TechSphere;