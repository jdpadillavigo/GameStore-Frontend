import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/explorar">Explorar</Link>
      <Link to="/categorias">Categorías</Link>
      <Link to="/">Inicio</Link>
      <Link to="/plataforma">Plataforma</Link>
      <Link to="/ofertas">Ofertas Especiales</Link>
      <Link to="/Login">Iniciar Sesión</Link>
      
      <input type="text" placeholder='Buscar' />
    </div>
  );
}

export default Navbar;