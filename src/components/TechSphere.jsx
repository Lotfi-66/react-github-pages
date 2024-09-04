import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaReact, FaJs, FaPhp, FaBootstrap, FaGithub, FaFigma, FaLinux, FaCss3Alt, FaHtml5, FaCube, FaCode, FaTerminal } from 'react-icons/fa';
import * as THREE from 'three';
import '../css/TechSphere.css';

const TechSphere = React.memo(() => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const config = useMemo(() => ({
        // Taille de la vue de la caméra, plus grande sur mobile pour un champ de vision plus large
        frustumSize: isMobile ? 1 : 1,

        // Échelle de la Terre, légèrement plus petite sur mobile pour s'adapter à l'écran
        earthScale: isMobile ? 3.5 : 1.24,

        // Position verticale de la Terre, ajustée pour la vue mobile
        earthPositionY: isMobile ? 0.5 : 1,

        // Échelle de la Lune, réduite sur mobile pour maintenir les proportions
        moonScale: isMobile ? 0.9 : 0.25,

        // Rayon de l'orbite de la Lune, plus petit sur mobile pour rester dans le champ de vision
        moonOrbitRadius: isMobile ? 1.5 : 2,

        // Rayon du cercle sur lequel les icônes sont placées, réduit sur mobile
        iconRadius: isMobile ? 5.5 * 0.7 : 2.8,

        // Échelle des icônes, légèrement plus petite sur mobile
        iconScale: isMobile ? 1.5 : 0.8,

        // Décalage horizontal des icônes, utilisé pour ajuster leur position sur mobile
        iconOffsetX: isMobile ? -10 : 0,

        // Facteur de translation horizontale pour le positionnement des icônes
        iconTranslateX: isMobile ? 70 : 100,

        // Facteur de translation verticale pour le positionnement des icônes
        iconTranslateY: isMobile ? 25 : 15,
        // Nouveau décalage horizontal global
        globalOffsetX: isMobile ? 2 : 3, // Ajustez ces valeurs selon vos besoins
    }), [isMobile]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.OrthographicCamera(
            config.frustumSize * aspect / -2, config.frustumSize * aspect / 2,
            config.frustumSize / 2, config.frustumSize / -2,
            0.9, 1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Création de la Terre
        const earthGeometry = new THREE.SphereGeometry(config.earthScale, 32, 32);
        const earthTexture = new THREE.TextureLoader().load('https://live.staticflickr.com/2521/3884071286_0b6ddb55dd_h.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            roughness: 0.6,
            metalness: 0.1
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.castShadow = true;
        earth.receiveShadow = true;
        earth.position.y = config.earthPositionY;
        earth.rotation.z = THREE.MathUtils.degToRad(23.5);
        scene.add(earth);

        // Création de la Lune
        const moonGeometry = new THREE.SphereGeometry(config.moonScale, 75, 75);
        const moonTexture = new THREE.TextureLoader().load('https://qph.cf2.quoracdn.net/main-qimg-916f32b07154a07addd64550591ec418-lq');
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            roughness: 25,
            metalness: 0
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.castShadow = false;
        moon.receiveShadow = true;
        scene.add(moon);

        // Lumières
        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
        sunLight.position.set(10, 10, 10);
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
        const moonOrbitSpeed = 0.001;
        const animateMoon = () => {
            moonAngle += moonOrbitSpeed;
            const moonX = Math.sin(moonAngle) * config.moonOrbitRadius * 3.76;
            const moonY = Math.cos(moonAngle) * config.moonOrbitRadius * 3.1;
            const moonZ = Math.cos(moonAngle) * config.moonOrbitRadius * 2.5;
            moon.position.set(earth.position.x + moonX, earth.position.y + moonY, earth.position.z + moonZ);
            moon.rotation.y += 0.01;
        };

        const icons = container.querySelectorAll('.icon');
        const totalIcons = icons.length;
        let angle = 0;
        const angleStep = (2 * Math.PI) / totalIcons;

        const animateIcons = () => {
            angle += 0.002;
            icons.forEach((icon, i) => {
                const x = config.iconRadius * Math.cos(angle + i * angleStep);
                const y = config.iconRadius * Math.sin(angle + i * angleStep);
                const z = config.iconRadius * Math.sin(angle + i * angleStep) * 3;

                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;

                icon.style.transform = `translate3d(${x * config.iconTranslateX + centerX + config.iconOffsetX}px, ${y * config.iconTranslateY + centerY}px, ${z * 100}px) scale(${config.iconScale})`;
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
    }, [isMobile, config]);

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