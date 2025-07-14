import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Verification: React.FC = () => {
  const [confirmacionCodigo, setConfirmacionCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5000";

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmacionCodigo.trim() === '') {
      setMensaje('Por favor, completa todos los campos ❗');
      return;
    }

    const usuarioPorRegistrar = localStorage.getItem('usuarioPorRegistrar');
    if (!usuarioPorRegistrar) {
      setMensaje('No se encontró el usuario por registrar ❌');
      return;
    }

    const parsedUsuario = JSON.parse(usuarioPorRegistrar);

    if (parsedUsuario.token.toString() === confirmacionCodigo) {
      try {
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedUsuario),
        });

        const data = await response.json();

        if (!response.ok) {
          setMensaje(data.msg || 'Error al registrar ❌');
          return;
        }

        setMensaje('Usuario registrado exitosamente ✅');
        
        localStorage.removeItem('usuarioPorRegistrar');

        setTimeout(() => {
          navigate('/login');
        }, 1000);

      } catch (error) {
        console.error(error);
        setMensaje('Error del servidor ❌');
      }
    } else {
      setMensaje('Código de confirmación incorrecto ❌');
    }
  };

  return (
    <div className="confirmation-container">
      <form className="confirmation-form">
        <h2>Por favor, confirma tu identidad</h2>
        <p>Te enviamos un código de confirmación. Ingrésalo a continuación:</p>

        {mensaje && <p className="confirmation-form__mensaje">{mensaje}</p>}

        <label htmlFor="confirmationCode">Código de confirmación:</label>
        <input
          type="text"
          id="confirmationCode"
          placeholder="Ingresa el código"
          value={confirmacionCodigo}
          onChange={(e) => setConfirmacionCodigo(e.target.value)}
          required
        />
        <button type="submit" onClick={handleConfirm}>Verificar código de confirmación</button>
      </form>
    </div>
  );
};

export default Verification;