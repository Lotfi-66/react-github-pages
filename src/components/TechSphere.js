import React, { useEffect, useRef } from 'react';
import { FaReact, FaJs, FaPhp, FaBootstrap, FaGithub, FaFigma, FaLinux } from 'react-icons/fa';
import * as THREE from 'three';

const TechSphere = () => {
    const containerRef = useRef(null);
    const moonContainerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const moonContainer = moonContainerRef.current;
        if (!container || !moonContainer) return;

        const scene = new THREE.Scene();
        const aspect = container.clientWidth / container.clientHeight;
        const frustumSize = 10;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2, frustumSize * aspect / 2,
            frustumSize / 2, frustumSize / -2,
            0.1, 1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Création de la Terre
        const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
        const earthTexture = new THREE.TextureLoader().load('https://live.staticflickr.com/2521/3884071286_0b6ddb55dd_h.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            roughness: 0.8,
            metalness: 0.4
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.castShadow = true;
        earth.receiveShadow = true;
        earth.position.y = 2; // Position de la Terre
        scene.add(earth);

        // Création de la Lune
        const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            roughness: 0.8,
            metalness: 0.1
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.castShadow = true;
        moon.receiveShadow = true;
        scene.add(moon);

        // Ajout d'une lumière directionnelle pour simuler le soleil
        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        sunLight.position.set(5, 5, 5);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        sunLight.shadow.camera.near = 1;
        sunLight.shadow.camera.far = 20;
        scene.add(sunLight);

        // Ajout d'une lumière ambiante
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        camera.position.set(0, 4, 10); // Position de la caméra
        camera.lookAt(new THREE.Vector3(0, 2, 0)); // Ajustez le point de vue de la caméra

        // Animation de la Terre
        const animateEarth = () => {
            earth.rotation.y += 0.01;
        };

        // Animation de la Lune
        let moonAngle = 0;
        const moonOrbitRadius = 2.5;
        const moonOrbitSpeed = 0.002;
        const animateMoon = () => {
            moonAngle += moonOrbitSpeed;
            const moonX = Math.sin(moonAngle) * moonOrbitRadius;
            const moonY = Math.cos(moonAngle) * moonOrbitRadius * 1.5; // Orbite elliptique
            const moonZ = Math.cos(moonAngle) * moonOrbitRadius * 1.5; // Ajout d'une profondeur

            moon.position.set(
                earth.position.x + moonX,
                earth.position.y + moonY,
                earth.position.z + moonZ
            );

            // Faire tourner la lune sur elle-même
            moon.rotation.y += 0.01;
        };

        // Animation des icônes
        const icons = container.querySelectorAll('.icon');
        const totalIcons = icons.length;
        const radius = 1.2;

        let angle = 0;
        const angleStep = (2 * Math.PI) / totalIcons;

        const animateIcons = () => {
            angle += 0.005;
            for (let i = 0; i < totalIcons; i++) {
                const icon = icons[i];
                const x = radius * Math.cos(angle + i * angleStep);
                const y = radius * Math.sin(angle + i * angleStep);
                const z = radius * Math.sin(angle + i * angleStep) * 0.3;
                icon.style.transform = `translate3d(${x * 250}px, ${(y + 2) * 80}px, ${z * 200}px) scale(0.7)`;
            }
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
            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeHandler);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="tech-sphere-container" ref={containerRef} style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'visible'
        }}>
            <div className="tech-sphere" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
                <FaReact className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaJs className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaPhp className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaBootstrap className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaGithub className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaFigma className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
                <FaLinux className="icon" style={{ position: 'absolute', top: '30%', left: '50%' }} />
            </div>
            <div ref={moonContainerRef} style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                overflow: 'visible'
            }}>
                <canvas id="moon-canvas" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></canvas> 
            </div>
        </div>);
};

export default TechSphere;
