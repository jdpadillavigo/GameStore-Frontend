import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5000";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setMensaje('Por favor, completa todos los campos ❗');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.msg || 'Error al iniciar sesión ❌');
        return;
      }

      setMensaje('Inicio de sesión exitoso ✅');

      localStorage.setItem('usuarioLogueado', JSON.stringify(data.usuario));
      localStorage.setItem('rol', data.usuario.role);

      setTimeout(() => {
        if (data.usuario.role === 'admin') {
          navigate('/a/usuarios');
        } else {
          navigate('/');
        }
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      setMensaje('Error del servidor ❌');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>

        {mensaje && <p className="login-form__mensaje">{mensaje}</p>}

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>

        <p className="login-form__link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <div className="login-form__forgot-password">
          <Link to="/restcontra">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
