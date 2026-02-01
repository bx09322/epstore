import React, { useState, useEffect } from 'react';
import FloatingLogin from './components/FloatingLogin';
import AdminPanel from './components/AdminPanel';
import './App.css';

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si hay usuario guardado en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>SafeMarket</h1>
          <nav>
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#contact">Contact</a>
            <a href="#faq">FAQ</a>
            <a href="#about">About</a>
            {user ? (
              <div className="user-menu">
                <span className="user-welcome">👋 {user.username}</span>
                {user.isAdmin && (
                  <span className="admin-badge">Admin</span>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="login-btn">
                🔒 Login
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {user?.isAdmin ? (
          <AdminPanel />
        ) : (
          <div className="welcome-section">
            <h2>Right choice for those who love to win!</h2>
            <p>
              Safe Market is a reseller of premium software solutions for gaming lovers.
              Focusing on PC Games we offer premium products with great support and service.
            </p>
            {!user && (
              <button onClick={() => setShowLogin(true)} className="shop-now-btn">
                Shop Now
              </button>
            )}
            {user && (
              <div className="user-dashboard">
                <h3>Bienvenido, {user.username}!</h3>
                <p>Estás conectado como usuario regular.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {showLogin && (
        <FloatingLogin
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;