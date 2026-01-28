import React from 'react'
import './About.css'

function About() {
  const skillsColumn1 = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  ]

  const skillsColumn2 = [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ]

  const skillsColumn3 = [
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  ]

  return (
    <section className="about" id="about">
      <h2>About<span className="heading-accent"></span></h2>
      <div className="about-container">
        <div className="about-left">
          <div className="avatar-placeholder">
            <svg viewBox="0 0 200 280" className="avatar-svg">
              <defs>
                <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4a90e2" />
                  <stop offset="50%" stopColor="#64b5f6" />
                  <stop offset="100%" stopColor="#4a90e2" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Head */}
              <ellipse cx="100" cy="65" rx="45" ry="50" fill="none" stroke="url(#avatarGradient)" strokeWidth="2" filter="url(#glow)"/>
              {/* Body */}
              <path d="M 25 280 Q 25 170 100 155 Q 175 170 175 280" fill="none" stroke="url(#avatarGradient)" strokeWidth="2" filter="url(#glow)"/>
              {/* Inner circle decoration */}
              <circle cx="100" cy="65" r="35" fill="none" stroke="url(#avatarGradient)" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>
          <div className="about-text">
            <p>
              Fully committed to the philosophy of life-long learning, I'm a full stack developer 
              with a deep passion for JavaScript, React and all things web development.
              The unique combination of creativity, logic, technology and never running out of new 
              things to discover, drives my excitement and passion for web development.
              When I'm not at my computer I like to spend my time reading, keeping fit and playing guitar.
            </p>
          </div>
        </div>
        <div className="about-right">
          <div className="skills-column offset">
            {skillsColumn1.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <span className="skill-name">{skill.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div className="skills-column">
            {skillsColumn2.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <span className="skill-name">{skill.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div className="skills-column offset">
            {skillsColumn3.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <span className="skill-name">{skill.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
