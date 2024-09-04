import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot depuis react-dom/client
import './css/index.css';
import App from './App';

// Créez une racine avec createRoot
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Utilisez la méthode render de la racine créée
root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
);