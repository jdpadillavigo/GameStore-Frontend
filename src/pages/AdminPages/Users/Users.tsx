import React, { useEffect, useState } from 'react';
import './Users.css';

const Users: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/a/usuarios`);
        const data = await response.json();

        const soloUsuarios = data.filter((usuario: any) => usuario.role === 'usuario');
        setUsuarios(soloUsuarios);
      } catch (error) {
        console.error(error);
        setMensaje('Error al obtener usuarios ❌');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="user-list">
      {loading ? (
        <p className="warning-message">Cargando usuarios...</p>
      ) : mensaje ? (
        <p className="warning-message">{mensaje}</p>
      ) : usuarios.length === 0 ? (
        <p className="warning-message">Aún no hay usuarios registrados</p>
      ) : (
        <div className="user-list-inner">
          <h2>Usuarios Registrados</h2>
          <div className="user-list-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>País</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario: any, index: number) => (
                  <tr key={usuario.id || index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;