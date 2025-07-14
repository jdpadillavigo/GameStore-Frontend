import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !contraseña || !confirmar || !pais) {
      setMensaje('Por favor, completa todos los campos ❗');
      return;
    }

    if (contraseña !== confirmar) {
      setMensaje('Las contraseñas no coinciden ❗');
      return;
    }

    const nuevoUsuario = {
      name: nombre,
      email: email,
      password: contraseña,
      country: pais,
      role: nombre.trim().startsWith('Admin') ? 'admin' : 'usuario',
      verificado: false,
      token: Math.floor(100000 + Math.random() * 900000),
    };

    localStorage.setItem('usuarioPorRegistrar', JSON.stringify(nuevoUsuario));
    
    setMensaje('¡Usuario preparado para verificación! ✅');

    setNombre('');
    setEmail('');
    setContraseña('');
    setConfirmar('');
    setPais('');

    setTimeout(() => {
      navigate('/verificacion');
      alert(`Código de confirmación: ${nuevoUsuario.token}`);
    }, 1000);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Registrarse</h2>

        <label htmlFor="nombre">Nombre de usuario</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre de usuario"
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="••••••••"
        />

        <label htmlFor="confirmar">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmar"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="••••••••"
        />

        <label htmlFor="pais">País</label>
        <select id="pais" value={pais} onChange={(e) => setPais(e.target.value)}>
          <option value="">Selecciona tu país</option>
          <option value="Perú">Perú</option>
          <option value="México">México</option>
          <option value="Argentina">Argentina</option>
          <option value="Colombia">Colombia</option>
          <option value="Chile">Chile</option>
          <option value="España">España</option>
          <option value="Otro">Otro</option>
        </select>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <button type="submit">Crear cuenta</button>

        <p className="link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

