import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/padel_courts_drone_footage.mp4' autoPlay loop muted />
      <h1>&nbsp;</h1>
      <h1>&nbsp;</h1>
      <h1>::PADEL CLUB ARGENTINA::</h1>
      <p>Una nueva experiencia deportiva</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          linkTo='/voy'
        >
          Voy
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          linkTo='/torneos'
        >
          Ver Torneos <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
