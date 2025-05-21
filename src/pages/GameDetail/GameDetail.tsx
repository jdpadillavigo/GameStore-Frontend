import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamesContext, Game } from '../../contexts/GamesContext';
import './GameDetail.css';

const GameDetail = () => {
  const { games } = useGamesContext();
  const { gameId } = useParams<{ gameId: string }>();
  const [gameSelected, setGameSelected] = useState<Game | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('rol') !== null);
  const [currentMedia, setCurrentMedia] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);
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

  const changeMedia = (nextIndex: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentMedia(nextIndex);
      setFade(false);
    }, 250); // Duración del fade-out
  };

  const handlePrev = () => {
    if (!gameSelected) return;
    const total = gameSelected.images.length + 1;
    const newIndex = (currentMedia - 1 + total) % total;
    changeMedia(newIndex);
  };

  const handleNext = () => {
    if (!gameSelected) return;
    const total = gameSelected.images.length + 1;
    const newIndex = (currentMedia + 1) % total;
    changeMedia(newIndex);
  };

  if (!gameSelected) return <p>Cargando...</p>;

  return (
    <div className="game-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>

      <h1 className="game-title">{gameSelected.title}</h1>
      <p className="game-description">{gameSelected.description}</p>

      <div className="media-slider">
        <button className="slider-btn" onClick={handlePrev}>⟨</button>

        {currentMedia === 0 ? (
          <iframe
            src={gameSelected.trailer}
            title="trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`game-trailer-video ${fade ? 'hidden' : ''}`}
          />
        ) : (
          <img
            src={gameSelected.images[currentMedia - 1]}
            alt={`preview ${currentMedia}`}
            className={`media-image ${fade ? 'hidden' : ''}`}
          />
        )}

        <button className="slider-btn" onClick={handleNext}>⟩</button>
      </div>

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

      <button className="buy-button" onClick={handleBuy}>
        Añadir al Carrito
      </button>
    </div>
  );
};

export default GameDetail;

