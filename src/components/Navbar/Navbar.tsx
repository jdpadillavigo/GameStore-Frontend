import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useGamesContext } from '../../contexts/GamesContext';
import './Navbar.css';

const Navbar = () => {
  const { games } = useGamesContext();

  const [search, setSearch] = useState<string>('');

  type Suggestion = {
    key: string;
    title: string;
  };

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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


    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const cleanText = (text: string) => {
    return text
      .normalize("NFD")                 // separa las letras de sus acentos
      .replace(/[\u0300-\u036f]/g, '')  // elimina los acentos
      .replace(/\s+/g, ' ')             // reemplaza espacios/saltos de línea/tabulaciones por un espacio
      .trim();                          // elimina espacios al inicio y al final
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    const filteredSuggestions: Suggestion[] = Object.entries(games)
      .filter(([key, game]) =>
        game &&
        (
          cleanText(game.title).toLowerCase().includes(cleanText(event.target.value).toLowerCase()) ||
          cleanText(key).toLowerCase().includes(cleanText(event.target.value).toLowerCase())
        )
      )
      .map(([key, game]) => ({
        title: game.title,
        key: key
      }));
    
    setSuggestions(filteredSuggestions);
  };

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
            <div ref={suggestionsRef}>
              <input
                type='text'
                value={search}
                onChange={handleChange}
                onFocus={handleChange}
                placeholder='Buscar juego'
              />
              {suggestions.length > 0 && (
                <ul className="navbar__search-login__suggestions">
                  {suggestions.map((suggestion) => (
                    <li
                      onClick={() => {
                        navigate('/juego/' + suggestion.key);
                        setSuggestions([]);
                        setSearch('')
                      }}
                    >
                      {suggestion.title.replace(/\s+/g, ' ').trim()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {isLogged ? (
              <Link to="/carrito" className="cart-icon">
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