import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css'; 

const Confirmation: React.FC = () => {
  const [confirmacionCodigo, setConfirmacionCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const codigoEsperado = localStorage.getItem('codigoConfirmacion');

    if (confirmacionCodigo === codigoEsperado) {
      setMensaje('✅ Código de confirmación válido');
      setTimeout(() => {
        localStorage.removeItem('codigoConfirmacion'); 
        navigate('/');
      }, 1000);
    } else {
      setMensaje('❌ Código de confirmación incorrecto');
    }
  };

  return (
    <div className="confirmation-container">
      <form className="confirmation-form" onSubmit={handleConfirm}>
        <h2>Por favor, confirma tu identidad</h2>
        <p>Te enviamos un código de confirmación. Ingrésalo a continuación:</p>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <label htmlFor="confirmationCode">Código de confirmación:</label>
        <input
          type="text"
          id="confirmationCode"
          placeholder="Ingresa el código"
          value={confirmacionCodigo}
          onChange={(e) => setConfirmacionCodigo(e.target.value)}
          required
        />
        <button type="submit">Verificar código de confirmación</button>
      </form>
    </div>
  );
};

export default Confirmation;
