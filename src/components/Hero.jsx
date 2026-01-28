import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm Taras.</p>
        <h1 className="hero-title">I'm a full stack web developer.</h1>
        <a href="#projects" className="hero-link">
          View my work
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
