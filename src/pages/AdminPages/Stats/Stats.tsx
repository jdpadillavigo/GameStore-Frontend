import React, { useEffect, useState } from 'react';
import './Stats.css';



const Stats: React.FC = () => {
const [totalUsuarios, setTotalUsuarios] = useState(0);

useEffect(() => {
const datos = localStorage.getItem('usuariosRegistrados');
const usuarios = datos ? JSON.parse(datos) : [];
const soloUsuarios = usuarios.filter((usuario: any) => usuario.rol === 'usuario');
setTotalUsuarios(soloUsuarios.length);
 }, []);



 return (

  <div className="Stats-container">
   <h1 className="Stats-title">Estadísticas</h1>
   <div className="Card-users">
    <p className="Stats-title2">Total De Usuarios Registrados</p>
    <h2 className="Totalusers">{totalUsuarios}</h2>
   </div>
  </div>

)

};

export default Stats;