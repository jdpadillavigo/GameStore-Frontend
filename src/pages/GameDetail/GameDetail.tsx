import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamesContext, Game } from '../../contexts/GamesContext';
import './GameDetail.css';

const GameDetail = () => {
  const { games } = useGamesContext();
  const { gameId } = useParams<{ gameId: string }>();
  const [ gameSelected, setGameSelected ] = useState<Game | null>(null);
  const [ isAuthenticated, setIsAuthenticated ] = useState(localStorage.getItem('rol') !== null);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId && games[gameId]) {
      setGameSelected(games[gameId]);
    }
  }, [gameId, games]);

  const handleBuy = () => {
    if (isAuthenticated) {
      console.log("Juego añadido al carrito");
    } else {
      navigate('/login'); // Redirigir a la página de login si no está autenticado
    }
  };

  if (!gameSelected) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="game-detail-container">
      <div className="game-detail-header">
        <img src={gameSelected.images[0]} alt={gameSelected.title} className="game-image" />
        <h1>{gameSelected.title}</h1>
      </div>
      <div className="game-detail-content">
        <p>{gameSelected.description}</p>
        <div className="game-trailer">
          <iframe 
            src={gameSelected.trailer} 
            title="trailer" 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className="game-trailer-video"
          />
        </div>
      </div>
      {isAuthenticated ? (
        <button className="buy-button" onClick={handleBuy}>
          Comprar
        </button>
      ) : (
        <p className="login-message">Inicia sesión para comprar</p>
      )}
    </div>
  );
};

export default GameDetail;