import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaMicrophone } from 'react-icons/fa';
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useGamesContext } from '../../contexts/GamesContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const [rol, setRol] = useState(localStorage.getItem('rol') || '');
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


    const handleScroll = () => {
      const isLandscape = window.innerWidth > window.innerHeight;

      if (isLandscape && window.innerWidth <= 935) {
        const currentScrollPos = window.pageYOffset;
        const isScrollingDown = prevScrollPos < currentScrollPos;
        const isAtTop = currentScrollPos < 10;
        setVisible(!isScrollingDown || isAtTop);
        setPrevScrollPos(currentScrollPos);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prevScrollPos]);

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
    localStorage.setItem('rol', '');
    setRol('');
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [escuchando, setEscuchando] = useState(false);
  const [micActivated, setMicActivated] = useState('');
  // Configurar el reconocimiento de voz

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const iniciarEscuchaParaCampo = (campo : string) => {
    setMicActivated(campo);
    setEscuchando(true);  // Indicar que el micrófono está escuchando
    recognition.start();

    // Asignar el campo directamente al reconocimiento de voz
    recognition.onresult = (event : any) => {
      let transcript = event.results[0][0].transcript;
      transcript= transcript.replace(' arroba ', '@').slice(0, transcript.length - 1);
  
      setSearch(transcript);

      handleChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>);

      setEscuchando(false);  // Finaliza la escucha
    };
  };
  
  // Detener cuando finaliza el reconocimiento
  recognition.onspeechend = () => {
    recognition.stop();
    setEscuchando(false);
    setMicActivated('');
  };
  
  // Manejar errores
  recognition.onerror = (event : any) => {
    console.error("Error al reconocer la voz: ", event.error);
    setEscuchando(false);
    setMicActivated('');
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

        <div className={`navbar ${!visible ? 'navbar-hidden' : ''}`}>
          <div className="navbar">
            <button className="navbar__mobile-menu" onClick={toggleMenu}>
              {isOpen ? <IoCloseSharp size={45} color="darkred" className="navbar__icon" />
                      : <IoMenu size={45} color="darkred" className="navbar__icon" />}
            </button>

            <div className={`navbar__menu ${isOpen ? 'show-mobile-menu' : ''}`}>
              <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
              <Link to="/juegos" onClick={() => setIsOpen(false)}>Juegos</Link>
              <Link to="/noticias" onClick={() => setIsOpen(false)}>Noticias</Link>
            </div>

            <div className='navbar__search-login'>
              <div className='navbar__search-login__search-bar' ref={suggestionsRef}>
                <input
                  type='text'
                  value={search}
                  onChange={handleChange}
                  onFocus={handleChange}
                  placeholder='Buscar juego'
                  onClick={() => setIsOpen(false)}
                />
                {suggestions.length > 0 && (
                  <ul className="navbar__search-login__suggestions">
                    {suggestions.map((suggestion) => (
                      <li
                        onClick={() => {
                          navigate('/juego/' + suggestion.key)
                          setSuggestions([])
                          setSearch('')
                          setIsOpen(false)
                        }}
                      >
                        {suggestion.title.replace(/\s+/g, ' ').trim()}
                      </li>
                    ))}
                  </ul>
                )}
                <FaMicrophone
                  className="navbar__search-login__mic-icon"
                  onClick={() => {
                    iniciarEscuchaParaCampo('search');
                  }}
                  size={23}
                  style={{ color: micActivated === 'search' ? 'red' : 'darkred' }}
                />
              </div>
              {isLogged ? (
                <Link to="/carrito" onClick={() => setIsOpen(false)}>
                  <FaShoppingCart size={45} className="navbar__icon" />
                </Link>
              ) : (
                <Link to="/" onClick={(e) => {
                  e.preventDefault()
                  alert('Debes iniciar sesión para acceder al carrito')
                  setIsOpen(false)
                }}>
                  <FaShoppingCart size={45} className="navbar__icon" />
                </Link>
              )}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <FaUserCircle size={45} className="navbar__icon" />
              </Link>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;