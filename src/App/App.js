// src/App.js
import React, { useState } from 'react';
import '../styles/Windows/StyleMainWindow.css';
import '../styles/Windows/StyleAuthorization.css';
import '../styles/Animation/AnimatedBackground.css'
import Login from '../components/AuthorizationComponents/Login';
import MainMenu from '../components/MainMenu';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        // ВАЖНО: Добавляем класс 'mode-login' или 'mode-menu'
        <div className={isAuthenticated ? 'mode-menu' : 'mode-login'}>
            {!isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <MainMenu />
            )}
        </div>
    );
}

export default App;