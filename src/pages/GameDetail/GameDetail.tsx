import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamesContext, Game } from '../../contexts/GamesContext';
import './GameDetail.css';

const GameDetail = () => {
  const { games } = useGamesContext();
  const { gameId } = useParams<{ gameId: string }>();
  const [gameSelected, setGameSelected] = useState<Game | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('rol') !== null);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId && games[gameId]) {
      setGameSelected(games[gameId]);
    }
  }, [gameId, games]);

  const handleBuy = () => {
    if (isAuthenticated) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      localStorage.setItem('cart', JSON.stringify([...new Set([...cart, gameId])]));
      alert('Juego añadido al carrito.');
    } else {
      navigate('/login');
    }
  };

  if (!gameSelected) return <p>Cargando...</p>;

  return (
    <div className="game-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>
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

        {/* Reseñas con estrellas y autor */}
        {gameSelected.reviews?.length > 0 && (
          <div className="game-reviews">
            <h3>Reseñas:</h3>
            {gameSelected.reviews.map((r, i) => (
              <div key={i} className="review-item">
                <strong>{r.author}:</strong>
                <div>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                <p>{r.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="buy-button" onClick={handleBuy}>
        Comprar
      </button>
    </div>
  );
};

export default GameDetail;
