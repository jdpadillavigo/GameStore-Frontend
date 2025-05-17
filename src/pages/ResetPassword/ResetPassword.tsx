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

    if (!email || !nuevaContraseña || !confirmarContraseña) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const datos = localStorage.getItem('usuariosRegistrados');
    const listaUsuarios = datos ? JSON.parse(datos) : [];

    const indice = listaUsuarios.findIndex((u: any) => u.email === email);

    if (indice !== -1) {
      listaUsuarios[indice].contraseña = nuevaContraseña;
      localStorage.setItem('usuariosRegistrados', JSON.stringify(listaUsuarios));
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
    <div className="restpassword-container">
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
