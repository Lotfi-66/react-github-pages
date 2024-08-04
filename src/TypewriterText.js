import React, { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        const type = () => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text[indexRef.current]);
                indexRef.current++;
                timeoutIdRef.current = setTimeout(type, speed);
            }
        };

        // Démarrer l'animation
        type();

        // Nettoyer le timeout lors du démontage
        return () => clearTimeout(timeoutIdRef.current);
    }, [text, speed]);

    return <p>{displayedText}</p>;
};

export default TypewriterText;