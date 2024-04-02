import React from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import './HeroSection.css';

const HeroSection: React.FC = () => {
    return (
      <div className='hero-container'>
        <video src='/videos/video-1.mp4' autoPlay loop muted />
        <h1>P A C O P A C O</h1>
        <p>The Transcendent Taco Experience.</p>
        <div className='hero-btns'>
            <Link href="/menu" passHref className='navlink'>
                ORDER NOW
            </Link>
        </div>
      </div>
    );
  };

export default HeroSection;
