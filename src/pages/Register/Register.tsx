import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [country, setCountry] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!nombre || !email || !password || !confirmar || !country) {
      setMensaje('Por favor, completa todos los campos');
      return;
    }

    if (password !== confirmar) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    // Guardar usuario simulado en localStorage
    const nuevoUsuario = { nombre, email, password, country };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    setMensaje('✅ ¡Usuario registrado exitosamente!');

    // Limpiar campos
    setNombre('');
    setEmail('');
    setPassword('');
    setConfirmar('');
    setCountry('');

    // Redirigir al login después de 1 segundo
    setTimeout(() => {
      navigate('/login');
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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





