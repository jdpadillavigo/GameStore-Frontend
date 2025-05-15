import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [rol, setRol] = useState(localStorage.getItem('rol') || 'usuario');
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem('usuarioRegistrado');
    if (datos) {
      setUsuario(JSON.parse(datos));
    }
  }, []);

  const handleLogout = () => {
    setRol('usuario');
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      {rol === 'admin' && usuario ?
        <div className="navbar-admin">
          <div className='navbar-admin__profile'>
            <Link to="/a/usuarios">
              <FaUserCircle className='navbar-admin__profile__icon' />
              <h1 className='navbar-admin__profile__name'>{usuario.nombre}</h1>
            </Link>
          </div>

          <Link to="/a/usuarios">Usuarios</Link>
          <Link to="/a/juegos">Juegos</Link>
          <Link to="/a/noticias">Noticias</Link>
          <Link to="/a/estadisticas">Estadísticas</Link>
          
          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

      :

        <div className="navbar">
          <Link to="/">Inicio</Link>
          <Link to="/explorar">Explorar</Link>
          <Link to="/categorias">Categorías</Link>
          <Link to="/plataforma">Plataforma</Link>
          <Link to="/ofertas">Ofertas Especiales</Link>
          
          <div className='navbar__search-login'>
            <input type="text" placeholder='Buscar' />
            <Link to="/login" className="navbar__user-icon">
              <FaUserCircle />
            </Link>
          </div>
        </div>
      }
    </>
  );
}

export default Navbar;