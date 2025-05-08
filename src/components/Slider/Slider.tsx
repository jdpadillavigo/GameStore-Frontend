import { useState, useEffect } from "react";
import './Slider.css';

type Slide = {
    url: string;
    title: string;
};

type SliderProps = {
    slides: Slide[];
};

const Slider = ({ slides }: SliderProps) => {
  return (
    <div className="slider-container">
        <img 
            src={slides[0].url} 
            alt={slides[0].title} 
            className="slider-slide"
        />
    </div>
  );
};

export default Slider;