import React, { useEffect, useRef } from 'react';
import { FaReact, FaJs, FaPhp, FaBootstrap, FaGithub, FaFigma, FaLinux, FaCss3Alt, FaHtml5, FaCube, FaCode, FaTerminal } from 'react-icons/fa';
import * as THREE from 'three';
import './TechSphere.css';

const TechSphere = React.memo(() => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const aspect = container.clientWidth / container.clientHeight;
        const frustumSize = 14;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2, frustumSize * aspect / 2,
            frustumSize / 2, frustumSize / -2,
            0.12, 1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Création de la Terre
        const earthGeometry = new THREE.SphereGeometry(3.6, 32, 32);
        const earthTexture = new THREE.TextureLoader().load('https://live.staticflickr.com/2521/3884071286_0b6ddb55dd_h.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            roughness: 0.6,
            metalness: 0.1
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.castShadow = true;
        earth.receiveShadow = true;
        earth.position.y = 1;
        earth.rotation.z = THREE.MathUtils.degToRad(20.5);
        scene.add(earth);

        // Création de la Lune
        const moonGeometry = new THREE.SphereGeometry(0.6, 75, 75);
        const moonTexture = new THREE.TextureLoader().load('https://qph.cf2.quoracdn.net/main-qimg-916f32b07154a07addd64550591ec418-lq');
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            roughness: 25,
            metalness: 0
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.castShadow = true;
        moon.receiveShadow = true;
        scene.add(moon);

        // Lumières
        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 3);
        sunLight.position.set(5, 1, 5);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1924;
        sunLight.shadow.mapSize.height = 1824;
        sunLight.shadow.camera.near = 1;
        sunLight.shadow.camera.far = 20;
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        camera.position.set(1, 5, 15);
        camera.lookAt(new THREE.Vector3(-0.5, 1.5, 0));

        // Animations
        const animateEarth = () => {
            earth.rotation.y += 0.005;
        };

        let moonAngle = 0;
        const moonOrbitRadius = 2;
        const moonOrbitSpeed = 0.002;
        const animateMoon = () => {
            moonAngle += moonOrbitSpeed;
            const moonX = Math.sin(moonAngle) * moonOrbitRadius * 9;
            const moonY = Math.cos(moonAngle) * moonOrbitRadius * 4;
            const moonZ = Math.cos(moonAngle) * moonOrbitRadius * 2.5;
            moon.position.set(earth.position.x + moonX, earth.position.y + moonY, earth.position.z + moonZ);
            moon.rotation.y += 0.01;
        };

        const icons = container.querySelectorAll('.icon');
        const totalIcons = icons.length;
        const radius = 1.6;
        let angle = 0;
        const angleStep = (2 * Math.PI) / totalIcons;

        const animateIcons = () => {
            angle += 0.005;
            icons.forEach((icon, i) => {
                const x = radius * Math.cos(angle + i * angleStep);
                const y = radius * Math.sin(angle + i * angleStep);
                const z = radius * Math.sin(angle + i * angleStep) * 0.9;
                icon.style.transform = `translate3d(${x * 190}px, ${(y + 3.14) * 80}px, ${z * 300}px) scale(0.7)`;
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
            const aspect = container.clientWidth / container.clientHeight;
            const newFrustumSize = frustumSize * 1.4; // Augmenter la taille du frustum
            camera.left = -newFrustumSize * aspect / 2;
            camera.right = newFrustumSize * aspect / 2;
            camera.top = newFrustumSize / 2;
            camera.bottom = -newFrustumSize / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', resizeHandler);
        resizeHandler(); // Appeler le gestionnaire de redimensionnement au démarrage

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeHandler);
            container.removeChild(renderer.domElement);
        };
    }, []);

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