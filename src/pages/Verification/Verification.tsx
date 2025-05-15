// Confirmation.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation: React.FC = () => {
  const [confirmacionCodigo, setConfirmacionCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleConfirm = () => {
    const codigoEsperado = localStorage.getItem('codigoConfirmacion');
    const email = localStorage.getItem('emailConfirmacion');

    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');

    if (confirmacionCodigo === codigoEsperado && email) {
      const actualizados = usuarios.map((u: any) =>
        u.email === email ? { ...u, verificado: true } : u
      );

      localStorage.setItem('usuariosRegistrados', JSON.stringify(actualizados));
      localStorage.removeItem('codigoConfirmacion');
      localStorage.removeItem('emailConfirmacion');
      setMensaje('✅ Código de confirmación válido');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      setMensaje('❌ Código de confirmación incorrecto');
    }
  };

  return (
    <div className="confirmation-container">
      <form className="confirmation-form">
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
        <button type="button" onClick={handleConfirm}>Verificar código de confirmación</button>
      </form>
    </div>
  );
};

export default Confirmation;
