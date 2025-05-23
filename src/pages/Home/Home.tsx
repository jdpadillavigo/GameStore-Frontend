import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGamesContext } from '../../contexts/GamesContext';
import Slider from '../../components/Slider/Slider';

import './Home.css';

const Home = () => {

  const { games } = useGamesContext();

  interface SliderImage {
    url: string;
    key: string;
  }

  const [slides, setSlides] = useState<SliderImage[]>([]);

  useEffect(() => {
    const gamesSlider = Object.entries(games).map(([key, game]) => ({
      url: game.images[0] || '',
      key: key,
    }));

    setSlides(gamesSlider);
  }, [games]);

  return (
    <div className="home-page">
      <section className="home-page__slider">
        <Slider slides={slides} />
      </section>
      <section className='home-page__content'>
        <h2>Juegos Destacados</h2>
        <div className="home-page__content__grid">
          {Object.entries(games).map(([key, game]) => (
            <Link to={`/juego/${key}`}>
              <div className="home-page__content__grid__game">
                <img src={game.images[0]} alt={game.title} />
                <p>{game.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
