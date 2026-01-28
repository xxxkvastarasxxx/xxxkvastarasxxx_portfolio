import React from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SectionDivider from './components/SectionDivider'
import './App.css'

function App() {
  return (
    <div className="app">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </div>
  )
}

export default App
