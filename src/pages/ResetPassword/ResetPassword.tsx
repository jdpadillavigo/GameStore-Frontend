import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmContraseña] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navegador = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!email || !nuevaContraseña || !confirmarContraseña) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const datos = localStorage.getItem('usuarioRegistrado');
    const usuario = datos ? JSON.parse(datos) : null;

    if (usuario && usuario.email === email) {
      usuario.contraseña = nuevaContraseña;
      localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
      setMensaje("Restablecimiento de contraseña exitoso ✅");
      setError('');
      setTimeout(() => {
        navegador('/login');
      }, 1000);
    } else {
      setError("No se encontró ningún usuario con ese correo.");
    }
  };

  return (
    <div className="restcontraseña-container">
      <div className="card">
        <h1>Restablece tu contraseña</h1>
        <p>
          Ingrese la dirección de correo electrónico verificada de su cuenta de usuario y le
          enviaremos un mensaje de confirmación de restablecimiento de contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña nueva"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña nueva"
            value={confirmarContraseña}
            onChange={(e) => setConfirmContraseña(e.target.value)}
          />
          <button type="submit">Enviar correo electrónico</button>
        </form>
        {error && <div className="error">{error}</div>}
        {mensaje && <div className="success">{mensaje}</div>}
      </div>
    </div>
  );
};

export default ResetPassword;
