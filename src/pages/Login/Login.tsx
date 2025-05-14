import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const datos = localStorage.getItem('usuarioRegistrado');
    const usuario = datos ? JSON.parse(datos) : null;

    if (!usuario) {
      setMensaje('Usuario no registrado');
      return;
    }

    const verificado = localStorage.getItem('usuarioVerificado') === 'true';
    if (!verificado) {
      setMensaje('Debes verificar tu correo antes de iniciar sesión ❗');
      return;
    }

    if (usuario && email === usuario.email && password === usuario.contraseña) {
      const esAdmin = usuario.nombre.startsWith('Admin');

      setMensaje('Inicio de sesión exitoso ✅');
      localStorage.setItem('rol', esAdmin ? 'admin' : 'usuario');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMensaje('Correo o contraseña incorrectos ❌');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
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

        <button type="submit">Entrar</button>

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
