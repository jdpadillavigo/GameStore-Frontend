import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GameDetail.css';

import game1 from '../../assets/images/slider/game1.jpg';
import game2 from '../../assets/images/slider/game2.jpg';
import game3 from '../../assets/images/slider/game3.jpg';
import game4 from '../../assets/images/slider/game4.jpg';
import game5 from '../../assets/images/slider/game5.jpg';
import game6 from '../../assets/images/slider/game6.jpg';
import game7 from '../../assets/images/slider/game7.jpg';
import game8 from '../../assets/images/slider/game8.jpg';
import game9 from '../../assets/images/slider/game9.jpg';
import game10 from '../../assets/images/slider/game10.jpg';

type GameData = {
  [key: string]: {
    title: string;
    description: string;
    trailer: string;
    image: string;
  };
};

const GameDetail = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('rol') !== null);
  const navigate = useNavigate();

  useEffect(() => {
    const gameData: GameData = {
      "Grand Theft Auto V": {
        title: "Grand Theft Auto V",
        description: "Un juego de acción y aventura de mundo abierto, donde puedes explorar una ciudad ficticia, cometer crímenes y vivir aventuras con diferentes personajes.",
        trailer: "https://www.youtube.com/embed/QkkoHAzjnUs",
        image: game1,
      },
      "Need for Speed Heat": {
        title: "Need for Speed Heat",
        description: "Un juego de carreras lleno de acción y adrenalina, con la posibilidad de personalizar vehículos y competir en circuitos nocturnos.",
        trailer: "https://www.youtube.com/embed/JXQGvHfpbwk",
        image: game2, 
      },
      "Elden Ring": {
        title: "Elden Ring",
        description: "Un juego de rol de acción en un mundo abierto donde los jugadores exploran un vasto mundo, luchan contra jefes desafiantes y mejoran sus habilidades.",
        trailer: "https://www.youtube.com/embed/K6BhHZDCi7Y",
        image: game3, 
      },
      "Cyberpunk 2077": {
        title: "Cyberpunk 2077",
        description: "Un juego de rol y acción ambientado en un futuro distópico, donde tomas el rol de un mercenario en la ciudad de Night City.",
        trailer: "https://www.youtube.com/embed/8Xk-xuTzO4g",
        image: game4, 
      },
      "Red Dead Redemption 2": {
        title: "Red Dead Redemption 2",
        description: "Un juego de acción y aventura ambientado en el Viejo Oeste, donde los jugadores toman el rol de un forajido que explora un mundo abierto y toma decisiones clave.",
        trailer: "https://www.youtube.com/embed/d1j1rxwE3Nc",
        image: game5, 
      },
      "Horizon Forbidden West": {
        title: "Horizon Forbidden West",
        description: "Un juego de aventura y acción en un mundo post-apocalíptico, donde controlas a Aloy, una cazadora que combate máquinas en un entorno vasto y diverso.",
        trailer: "https://www.youtube.com/embed/mGRsM6-1M4g",
        image: game6, 
      },
      "Ghost of Tsushima": {
        title: "Ghost of Tsushima",
        description: "Un juego de acción y aventura ambientado en el Japón feudal, donde tomas el rol de un samurái que lucha por defender su hogar.",
        trailer: "https://www.youtube.com/embed/bk5uK5z7IMY",
        image: game7, 
      },
      "Assassin’s Creed Valhalla": {
        title: "Assassin’s Creed Valhalla",
        description: "Un juego de acción y aventura ambientado en la época vikinga, donde controlas a un guerrero vikingo mientras exploras un mundo abierto y realizas misiones.",
        trailer: "https://www.youtube.com/embed/UbjWzY6kJz4",
        image: game8, 
      },
      "Spider-Man": {
        title: "Spider-Man",
        description: "Un juego de acción y aventura basado en el famoso superhéroe Spider-Man, donde puedes balancearte por la ciudad de Nueva York y luchar contra diversos villanos.",
        trailer: "https://www.youtube.com/embed/3Azcd4zowIY",
        image: game9, 
      },
      "Resident Evil 4 Remake": {
        title: "Resident Evil 4 Remake",
        description: "Un juego de survival horror donde controlas a Leon S. Kennedy en una misión para rescatar a la hija del presidente mientras lucha contra criaturas infectadas.",
        trailer: "https://www.youtube.com/embed/KE8jz5C4X1w",
        image: game10, 
      }
    };

    if (gameId && gameData[gameId]) {
      setGame(gameData[gameId]);
    }
  }, [gameId]);

  const handleBuy = () => {
    if (isAuthenticated) {
      console.log("Juego añadido al carrito");
    } else {
      navigate('/login'); // Redirigir a la página de login si no está autenticado
    }
  };

  if (!game) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="game-detail-container">
      <div className="game-detail-header">
        <img src={game.image} alt={game.title} className="game-image" />
        <h1>{game.title}</h1>
      </div>
      <div className="game-detail-content">
        <p>{game.description}</p>
        <div className="game-trailer">
          <iframe 
            src={game.trailer} 
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