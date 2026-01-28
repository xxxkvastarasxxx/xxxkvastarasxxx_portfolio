import React, { useState, useEffect, useRef } from 'react'
import './Projects.css'

function Projects() {
  const [currentSlides, setCurrentSlides] = useState({})
  const [pausedSliders, setPausedSliders] = useState({})
  
  const basePath = import.meta.env.BASE_URL
  
  const imperiumImages = [
    `${basePath}images/projects/imperium_roma1.png`,
    `${basePath}images/projects/imperium_roma2.png`,
    `${basePath}images/projects/imperium_roma3.png`,
    `${basePath}images/projects/imperium_roma4.png`
  ]
  const DomusImages = [
    `${basePath}images/projects/domusconstruction1.png`,
    `${basePath}images/projects/domusconstruction2.png`,
    `${basePath}images/projects/domusconstruction3.png`,
  ]
  const MishaEditsImages = [
    `${basePath}images/projects/misha1.png`,
    `${basePath}images/projects/misha2.png`,
    `${basePath}images/projects/misha3.png`,
  ]

  const NLTImages = [
    `${basePath}images/projects/nlt1.png`,
    `${basePath}images/projects/nlt2.png`,
    `${basePath}images/projects/nlt3.png`,
    `${basePath}images/projects/nlt4.png`,
    `${basePath}images/projects/nlt5.png`,
  ]

  const projects = [
    {
      id: 1,
      title: 'Imperium Roma',
      subtitle: 'Full Stack Platform for Roman Coin Collectors',
      description: 'The premier destination for ancient Roman coin enthusiasts, collectors, and scholars. Features Domus — an exclusive community platform where collectors can catalog, organize, and showcase their coins with intuitive digital tools. Includes advanced coin identification, 3D model generation, collection management, community discussions, and integration with major auction houses.',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'Three.js'],
      demo: 'https://imperiumroma.com',
      images: imperiumImages,
      featured: true
    },
    {
      id: 2,
      title: 'Misha Edits',
      subtitle: 'Professional Video Editing Portfolio',
      description: 'A sleek, modern portfolio website for a professional video editor with 10+ years of experience and 1,000+ edited videos. Features client testimonials, project showcases, service pricing tiers, and a contact system.',
      technologies: ['React', 'TypeScript', 'Astro', 'CSS3'],
      demo: 'https://mishaedits.com',
      images: MishaEditsImages,
      featured: false
    },
    {
      id: 3,
      title: 'Domus Design Build',
      subtitle: 'Construction Company Website',
      description: 'A professional website for a UK-based construction company specializing in residential and commercial projects. Features service showcases, project gallery with before/after comparisons, client testimonials, and a quote request system.',
      technologies: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
      demo: 'https://domusdesignbuild.co.uk',
      images: DomusImages,
      featured: false
    },
    {
      id: 4,
      title: 'New Local Tools',
      subtitle: 'E-Commerce Platform Contributor',
      description: 'Contributed to the development of a professional online tool shop serving London and the UK. Worked on various website sections and processes, and conducted extensive functionality testing across the platform.',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'QA Testing'],
      demo: 'https://newlocaltools.uk',
      images: NLTImages,
      featured: false
    }
  ]

  // Initialize slides for each project with images
  useEffect(() => {
    const initialSlides = {}
    projects.forEach(p => {
      if (p.images) {
        initialSlides[p.id] = 0
      }
    })
    setCurrentSlides(initialSlides)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const timers = projects
      .filter(p => p.images && !pausedSliders[p.id])
      .map(p => {
        return setInterval(() => {
          setCurrentSlides(prev => ({
            ...prev,
            [p.id]: (prev[p.id] + 1) % p.images.length
          }))
        }, 4000)
      })
    
    return () => timers.forEach(t => clearInterval(t))
  }, [pausedSliders])

  const nextSlide = (projectId, imageCount) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imageCount
    }))
  }

  const prevSlide = (projectId, imageCount) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + imageCount) % imageCount
    }))
  }

  const handleMouseEnter = (projectId) => {
    setPausedSliders(prev => ({ ...prev, [projectId]: true }))
  }

  const handleMouseLeave = (projectId) => {
    setPausedSliders(prev => ({ ...prev, [projectId]: false }))
  }

  return (
    <section className="projects" id="projects">
      <h2>Projects<span className="heading-accent"></span></h2>
      <p className="projects-intro">A selection of projects I've built and contributed to</p>
      
      <div className="projects-container">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`project-item ${project.featured ? 'featured' : ''} ${index % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="project-image-wrapper">
              {project.images ? (
                <div 
                  className="project-slider"
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                >
                  <div className="slider-container">
                    {project.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`slide ${idx === (currentSlides[project.id] || 0) ? 'active' : ''}`}
                      >
                        <img src={img} alt={`${project.title} screenshot ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                  <button className="slider-btn prev" onClick={() => prevSlide(project.id, project.images.length)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button className="slider-btn next" onClick={() => nextSlide(project.id, project.images.length)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="image-overlay"></div>
                </div>
              )}
              <div className="project-number">0{project.id}</div>
            </div>
            
            <div className="project-content">
              {project.featured && <span className="featured-badge">Featured Project</span>}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn">
                  <span>Visit Site</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
