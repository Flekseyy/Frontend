import React, { useState } from 'react';
import '../../styles/Windows/StyleAuthorization.css';
import Register from './Register';
import '../../styles/Animation/AnimatedBackground.css';

const Login = ({ onLogin }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Здесь запрос на бэкенд для авторизации
    console.log('Login:', { email, password });
    onLogin();
  };

  if (showRegister) {
    return <Register onLogin={onLogin} onBack={() => setShowRegister(false)} />;
  }

  return (
      <>

        <div className="animated-bg-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <section>
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Sign in</button>
            <div className="divider">
              <span>or</span>
            </div>
            <button type="button" className="google-btn">
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            <div className="register">
              <p>
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowRegister(true); }}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </section>
      </>
  );
};

export default Login;