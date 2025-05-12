import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
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
  );
}

export default Navbar;