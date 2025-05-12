import Slider from '../../components/Slider/Slider';
import game1 from '../../assets/images/slider/game1.jpg';
import game2 from '../../assets/images/slider/game2.jpg';
import game3 from '../../assets/images/slider/game3.jpg';
import './Home.css';

const Home = () => {
  const slides = [
    { url: game1, title: "game1" },
    { url: game2, title: "game2" },
    { url: game3, title: "game3" },
  ];

  const games = [
    { title: "The Witcher 3", image: game1 },
    { title: "God of War", image: game2 },
    { title: "Red Dead Redemption 2", image: game3 },
    { title: "Cyberpunk 2077", image: game1 },
    { title: "Elden Ring", image: game2 },
    { title: "Horizon Forbidden West", image: game3 },
    { title: "Ghost of Tsushima", image: game1 },
    { title: "Assassin’s Creed Valhalla", image: game2 },
    { title: "Spider-Man", image: game3 },
    { title: "Resident Evil 4 Remake", image: game1 },
  ];

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
              <img src={game.image} alt={game.title} />
              <p>{game.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;