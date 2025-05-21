import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Slider.css';

type Slide = {
  url: string;
  key: string;
};

type SliderProps = {
  slides: Slide[];
};

const Slider = ({ slides }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const changeSlide = (newIndex: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsChanging(false);
      }, 50);
    }, 100);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    changeSlide(slideIndex);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="slider-container">
      {slides.length > 1 && (
        <>
          <button 
            onClick={goToPrevious} 
            className="slider-container__arrow slider-container__arrow__left"
          >
            ❰
          </button>
          <button 
            onClick={goToNext} 
            className="slider-container__arrow slider-container__arrow__right"
          >
            ❱
          </button>
        </>
      )}

      <div
        className={`slider-container__slide ${isChanging ? 'slider-container__slide__changing' : ''}`}
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
        }}
      >
        <Link to={`/game/${slides[currentIndex].key}`}>
          Ver juego
        </Link>
      </div>

      {slides.length > 1 && (
        <div className="slider-container__dots">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`slider-container__dots__dot ${slideIndex === currentIndex ? 'active' : ''}`}
            >
              ●
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default Slider;