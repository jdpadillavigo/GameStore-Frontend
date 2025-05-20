import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import {  FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  interface Usuario {
    nombre: string;
    email: string;
    contraseña: string;
    pais: string;
    rol: string;
    verificado: boolean;
  }

  const [rol, setRol] = useState(localStorage.getItem('rol') || 'usuario');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();
  const isLogged = Boolean(usuario);

  useEffect(() => {
    const datosUsuario = localStorage.getItem('usuarioLogueado');
    const rolUsuario = localStorage.getItem('rol');

    if (datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    }

    if (rolUsuario) {
      setRol(rolUsuario);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
    localStorage.setItem('rol', 'usuario');
    setRol('usuario');
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
          <Link to="/juegos">Juegos</Link>
          <Link to="/noticias">Noticias</Link>
          
          <div className='navbar__search-login'>
            <input type="text" placeholder='Buscar' />
            {isLogged ? (
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
              </Link>
            ) : (
              <Link to="/" className="cart-icon" onClick={(e) => {
                e.preventDefault();
                alert('Debes iniciar sesión para acceder al carrito');
              }}>
                <FaShoppingCart />
              </Link>
            )}
            <Link to="/login" className="navbar__user-icon">
              <FaUserCircle />
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;