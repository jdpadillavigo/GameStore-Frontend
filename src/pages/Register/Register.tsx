import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navegador = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !contraseña || !confirmar || !pais) {
      setMensaje('Por favor, completa todos los campos');
      return;
    }

    if (contraseña !== confirmar) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    const nuevoUsuario = { nombre, email, contraseña, pais };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    localStorage.setItem('codigoConfirmacion', codigo);

    console.log('Código de confirmación enviado (simulado):', codigo);
    alert(`Código de confirmación enviado al correo: ${codigo}`);

    setMensaje('✅ ¡Usuario registrado exitosamente!');

    setNombre('');
    setEmail('');
    setContraseña('');
    setConfirmar('');
    setPais('');

    setTimeout(() => {
      navegador('/confirmacion');
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
          required
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="••••••••"
          required
        />

        <label htmlFor="confirmar">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmar"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="••••••••"
          required
        />

        <label htmlFor="country">País</label>
        <select
          id="country"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          required
        >
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
