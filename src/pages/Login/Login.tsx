import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const datos = localStorage.getItem('usuarioRegistrado');
  const usuario = datos ? JSON.parse(datos) : null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (usuario && email === usuario.email && password === usuario.password) {
      setMensaje('Inicio de sesión exitoso ✅');
    } else {
      setMensaje('Correo o contraseña incorrectos ❌');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        {mensaje && <p className="mensaje">{mensaje}</p>}
        <label htmlFor="email">Nombre de usuario o Correo:</label>
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

        <button type="submit">Entrar</button>
        <p className="link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <div className="forgot-password">
               <Link to="/restcontraseña">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
   };

export default Login;

