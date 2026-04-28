import React, { useState } from 'react'
import './styles/base.css'
import './styles/animations.css'
import './styles/common-ui.css'
import './features/Auth/styles.css'
import './layouts/MainLayout.css'

import Login from './features/Auth/components/Login'
import MainLayout from './layouts/MainLayout'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <div className={isAuthenticated ? 'mode-menu' : 'mode-login'}>
            {!isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <MainLayout />
            )}
        </div>
    )
}

export default App