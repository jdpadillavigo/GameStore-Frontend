// Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email);

    if (!usuario) {
      setMensaje('Usuario no registrado');
      return;
    }

    if (!usuario.verificado) {
      setMensaje('Debes verificar tu correo antes de iniciar sesión ❗');
      return;
    }

    if (usuario.contraseña === password) {
      localStorage.setItem('rol', usuario.rol);
      setMensaje('Inicio de sesión exitoso ✅');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMensaje('Correo o contraseña incorrectos ❌');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Iniciar sesión</h2>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleLogin}>Entrar</button>

        <p className="link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <div className="forgot-password">
          <Link to="/restcontra">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
