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
    <div className="stats-container">
      <h2 className="stats-title">Estadísticas</h2>
      <div className="card-users">
        <p>Total de usuarios registrados</p>
        <h1>{totalUsuarios}</h1>
      </div>
    </div>
  )
};

export default Stats;