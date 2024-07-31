// src/components/TechSphere.js
import React, { useEffect, useRef } from 'react';
import { FaReact, FaJs, FaPhp, FaBootstrap, FaGithub, FaNodeJs } from 'react-icons/fa';

const TechSphere = () => {
    const sphereRef = useRef(null);

    useEffect(() => {
        const sphere = sphereRef.current;
        const icons = sphere.children;
        const totalIcons = icons.length;
        const radius = 100;

        let angle = 0;
        const angleStep = (2 * Math.PI) / totalIcons;

        const animate = () => {
            angle += 0.01;
            for (let i = 0; i < totalIcons; i++) {
                const icon = icons[i];
                const x = radius * Math.cos(angle + i * angleStep);
                const y = radius * Math.sin(angle + i * angleStep);
                const z = radius * Math.sin(angle + i * angleStep);
                icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            }
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="tech-sphere" ref={sphereRef}>
            <FaReact className="icon" />
            <FaJs className="icon" />
            <FaPhp className="icon" />
            <FaBootstrap className="icon" />
            <FaGithub className="icon" />
        </div>
    );
};

export default TechSphere;
