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

  return (
    <div className="home-page">
      <div className="home-page__slider">
        <Slider slides={slides} />
      </div>
    </div>
  );
}

export default Home;