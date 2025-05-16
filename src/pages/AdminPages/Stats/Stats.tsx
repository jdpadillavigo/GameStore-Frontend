import './Stats.css';

import React, { useEffect, useState } from 'react';

const Stats: React.FC = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    const datos = localStorage.getItem('usuariosRegistrados');
    const usuarios = datos ? JSON.parse(datos) : [];
    setTotalUsuarios(usuarios.length);
  }, []);

   return (
    <div className="estadisticas-container">
      <h2 className="estadisticas-titulo">Estadísticas</h2>
      <div className="tarjeta-usuarios">
        <p>Total de usuarios registrados</p>
        <h1>{totalUsuarios}</h1>
      </div>
    </div>
  )
};

export default Stats;
;