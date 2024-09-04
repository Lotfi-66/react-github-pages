import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
        }));

        const comets = Array.from({ length: 5 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 0.5, // Réduire la taille de la tête
            speed: Math.random() * 2 + 0.5, // Réduire légèrement la vitesse
            angle: Math.random() * Math.PI * 2,
            tailLength: Math.random() * 40 + 10, // Réduire la longueur de la traînée
            hasCross: false,
            crossOpacity: 1,
        }));

        const drawComet = (comet) => {
            // Dessiner la traînée
            const gradient = ctx.createLinearGradient(
                comet.x, comet.y,
                comet.x - comet.tailLength * Math.cos(comet.angle),
                comet.y - comet.tailLength * Math.sin(comet.angle)
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(comet.x, comet.y);
            ctx.lineTo(
                comet.x - comet.tailLength * Math.cos(comet.angle),
                comet.y - comet.tailLength * Math.sin(comet.angle)
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = comet.radius * 0.5; // Réduire l'épaisseur de la traînée
            ctx.stroke();

            // Dessiner la tête de la comète
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, comet.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        };

        const drawCross = (x, y, opacity) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1; // Réduire l'épaisseur de la croix

            ctx.beginPath();
            ctx.moveTo(x - 5, y); // Réduire la taille de la croix
            ctx.lineTo(x + 5, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y - 5);
            ctx.lineTo(x, y + 5);
            ctx.stroke();

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner les étoiles
            ctx.fillStyle = 'white';
            ctx.beginPath();
            stars.forEach(star => {
                ctx.moveTo(star.x, star.y);
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, true);
                star.x += star.vx;
                star.y += star.vy;
                if (star.x < 0 || star.x > canvas.width) star.x = Math.random() * canvas.width;
                if (star.y < 0 || star.y > canvas.height) star.y = Math.random() * canvas.height;
            });
            ctx.fill();

            // Dessiner et animer les comètes
            comets.forEach(comet => {
                if (!comet.hasCross) {
                    drawComet(comet);
                    comet.x += comet.speed * Math.cos(comet.angle);
                    comet.y += comet.speed * Math.sin(comet.angle);
                    comet.angle += 0.001;
                    if (comet.x < 0 || comet.x > canvas.width || comet.y < 0 || comet.y > canvas.height) {
                        comet.hasCross = true;
                        comet.crossOpacity = 0.8;
                    }
                } else {
                    drawCross(comet.x, comet.y, comet.crossOpacity);
                    comet.crossOpacity -= 1.3 / comet.radius;
                    if (comet.crossOpacity <= 0) {
                        comet.x = Math.random() * canvas.width;
                        comet.y = Math.random() * canvas.height;
                        comet.angle = Math.random() * Math.PI * 2;
                        comet.hasCross = false;
                    }
                }
            });

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundColor: 'black',
            }}
        />
    );
};

export default StarryBackground;