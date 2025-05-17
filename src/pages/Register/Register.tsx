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
 const navegador = useNavigate();

 const handleRegister = () => {

  if (!nombre || !email || !contraseña || !confirmar || !pais) {

   setMensaje('Por favor, completa todos los campos');
   return;

  }


  if (contraseña !== confirmar) {
   setMensaje('Las contraseñas no coinciden');
   return;

  }



  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  const rol = nombre.startsWith('Admin') ? 'admin' : 'usuario';
  const nuevoUsuario = { nombre, email, contraseña, pais, rol, verificado: false };
  const usuariosExistentes = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');

  usuariosExistentes.push(nuevoUsuario);

  localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosExistentes));
  localStorage.setItem('codigoConfirmacion', codigo);
  localStorage.setItem('emailConfirmacion', email);


  alert(`Código de confirmación enviado al correo: ${codigo}`);
  setMensaje('✅ ¡Usuario registrado exitosamente!');

  setNombre('');

  setEmail('');

  setContraseña('');

  setConfirmar('');

  setPais('');

  setTimeout(() => {

   navegador('/verificacion');

  }, 1000);

 };



 return (

<div className="register-container">

   <form className="register-form">
    <h2>Registrarse</h2>

    <label htmlFor="nombre">Nombre de usuario</label>
    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe tu nombre de usuario" required />

    <label htmlFor="email">Correo electrónico</label>
    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" required />

    <label htmlFor="password">Contraseña</label>
    <input type="password" id="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="••••••••" required />

    <label htmlFor="confirmar">Confirmar contraseña</label>
    <input type="password" id="confirmar" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} placeholder="••••••••" required />

    <label htmlFor="country">País</label>

    <select id="country" value={pais} onChange={(e) => setPais(e.target.value)} required>

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

    <button type="button" onClick={handleRegister}>Crear cuenta</button>
    
    <p className="link">
     ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
    </p>

   </form>

  </div>

 );

};



export default Register;

