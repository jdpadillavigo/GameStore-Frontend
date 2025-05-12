import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
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
import { useCart } from '../../components/CartContext/useCart';


import './Home.css';

const Home = () => {
  const { addToCart } = useCart(); // Desestructurar la función addToCart desde el contexto

  const slides = [
    { url: game1, title: "game1" },
    { url: game2, title: "game2" },
    { url: game3, title: "game3" },
    { url: game4, title: "game4" },
    { url: game5, title: "game5" },
    { url: game6, title: "game6" },
    { url: game7, title: "game7" },
    { url: game8, title: "game8" },
    { url: game9, title: "game9" },
    { url: game10, title: "game10" },
  ];

  const games = [
    { title: "Grand Theft Auto V", image: game1 },
    { title: "Need for Speed Heat", image: game2 },
    { title: "Elden Ring", image: game3 },
    { title: "Cyberpunk 2077", image: game4 },
    { title: "Red Dead Redemption 2", image: game5 },
    { title: "Horizon Forbidden West", image: game6 },
    { title: "Ghost of Tsushima", image: game7 },
    { title: "Assassin’s Creed Valhalla", image: game8 },
    { title: "Spider-Man", image: game9 },
    { title: "Resident Evil 4 Remake", image: game10 },
  ];

  // Manejo de agregar al carrito
  const handleAddToCart = (game: any) => {
    addToCart(game); // Agregar el juego al carrito
  };

  return (
    <div className="home-page">
      <section className="home-page__slider">
        <Slider slides={slides} />
      </section>
      <section className='home-page__content'>
        <h2>Juegos Destacados</h2>
        <div className="home-page__content__grid">
          {games.map((game, index) => (
            <div key={index} className="home-page__content__grid__game">
              <Link to={`/game/${game.title}`}>
                <img src={game.image} alt={game.title} />
              </Link>
              <p>{game.title}</p>
              {/* Botón para agregar al carrito */}
              <button onClick={() => handleAddToCart(game)}>Comprar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
