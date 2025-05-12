import React, { useState } from 'react';
import './RestContraseña.css';
import { useNavigate } from 'react-router-dom'; 

const RestContraseña: React.FC = () => {
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

    
    setMensaje("Restablecimiento de contraseña exitoso");
    setError('');

   
      navegador('/login');
    
  };

  return (
    <div className="restcontraseña-container">
      <div className="card">
        <h1>Restablece Tu Contraseña</h1>
        <p>
             Ingrese la dirección de correo electrónico verificada de su cuenta de usuario 
            y le enviaremos un mensaje de confirmación de restablecimiento de contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="contraseña"
            placeholder="Contraseña Nueva"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
          />
          <input
            type="contraseña"
            placeholder="Confirmar Contraseña Nueva"
            value={confirmarContraseña}
            onChange={(e) => setConfirmContraseña(e.target.value)}
          />
          <button type="submit">Enviar Correo Electrónico</button>
        </form>
        {error && <div className="error">{error}</div>}
        {mensaje && <div className="success">{mensaje}</div>}
      </div>
    </div>
  );
};

export default RestContraseña;
