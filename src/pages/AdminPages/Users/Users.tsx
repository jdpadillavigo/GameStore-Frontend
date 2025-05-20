import React, { useEffect, useState } from 'react';
import './Users.css';

const Users: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem('usuariosRegistrados');
    const usuariosRegistrados = datos ? JSON.parse(datos) : [];
    const soloUsuarios = usuariosRegistrados.filter((usuario: any) => usuario.rol === 'usuario');
    setUsuarios(soloUsuarios);
  }, []);

  return (
    <div className="user-list">
      <div className="user-list-inner">
        <h1>Usuarios Registrados</h1>
        <div className="user-list-container">
          {usuarios.length === 0 ? (
            <p className="no-users-message">Aún no hay usuarios registrados</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Contraseña</th>
                  <th>País</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.contraseña}</td>
                    <td>{usuario.pais}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

