// src/components/TypewriterText.jsx

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const TypewriterContainer = styled.div`
  font-family:  url('../fonts/Futurama bold.ttf') format('truetype');
  color: #ffffff;
  text-shadow: 0 0 5px #00ff00;
`;

const Cursor = styled.span`
  animation: ${blink} 0.7s infinite;
`;

const TypewriterText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <TypewriterContainer>
      {displayedText}
      {currentIndex < text.length && <Cursor>|</Cursor>}
    </TypewriterContainer>
  );
};

export default TypewriterText;