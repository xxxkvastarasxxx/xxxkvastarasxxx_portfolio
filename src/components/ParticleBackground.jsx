import React, { useEffect, useRef } from 'react'
import './ParticleBackground.css'

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const mouse = { x: null, y: null, radius: 200 }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Get visible sections (Hero only for full effect)
    const getVisibleDarkSections = () => {
      const heroSection = document.getElementById('hero')
      const sections = []

      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          sections.push({ top: rect.top, bottom: rect.bottom, type: 'full' })
        }
      }

      return sections
    }

    // Check if a point is within visible dark sections (full effect)
    const isInDarkSection = (y) => {
      const sections = getVisibleDarkSections()
      return sections.some(section => y >= section.top && y <= section.bottom)
    }

    // Get About, Projects, and Contact sections for dots-only effect
    const getDotsOnlySections = () => {
      const sections = []
      
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          sections.push({ top: rect.top, bottom: rect.bottom })
        }
      }

      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          sections.push({ top: rect.top, bottom: rect.bottom })
        }
      }

      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          sections.push({ top: rect.top, bottom: rect.bottom })
        }
      }

      return sections
    }

    // Check if a point is in About, Projects, or Contact section (dots only)
    const isInDotsOnlySection = (y) => {
      const sections = getDotsOnlySections()
      return sections.some(section => y >= section.top && y <= section.bottom)
    }

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.density = Math.random() * 30 + 1
      }

      update() {
        // Base movement
        this.baseX += this.speedX
        this.baseY += this.speedY

        // Bounce off edges
        if (this.baseX > canvas.width || this.baseX < 0) {
          this.speedX = -this.speedX
        }
        if (this.baseY > canvas.height || this.baseY < 0) {
          this.speedY = -this.speedY
        }

        // Check if in dots-only section (no mouse interaction there)
        const inDotsOnlySection = isInDotsOnlySection(this.y) && !isInDarkSection(this.y)

        // Mouse interaction - push particles away (only in Hero/Contact)
        if (mouse.x != null && mouse.y != null && !inDotsOnlySection) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = mouse.radius
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const moveX = forceDirectionX * force * this.density * 0.6
            const moveY = forceDirectionY * force * this.density * 0.6

            this.x = this.baseX - moveX
            this.y = this.baseY - moveY
          } else {
            // Smoothly return to base position
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 10
            }
          }
        } else {
          // Return to base when mouse leaves or in About section
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 20
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 20
          }
        }
      }

      draw() {
        const inDarkSection = isInDarkSection(this.y)
        const inDotsOnly = isInDotsOnlySection(this.y)

        // Skip if not in any relevant section
        if (!inDarkSection && !inDotsOnly) return

        // For About/Projects section - simple floating dots, no glow effects
        if (inDotsOnly && !inDarkSection) {
          ctx.fillStyle = 'rgba(74, 144, 226, 0.4)'
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
          return
        }

        // For Hero/Contact sections - full effect with glow
        let glowIntensity = 0
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            glowIntensity = 1 - distance / mouse.radius
          }
        }

        ctx.shadowBlur = 10 + glowIntensity * 15
        ctx.shadowColor = `rgba(74, 144, 226, ${0.5 + glowIntensity * 0.5})`
        ctx.fillStyle = `rgba(74, 144, 226, ${0.6 + glowIntensity * 0.4})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size + glowIntensity * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Create particles
    const initParticles = () => {
      particles = []
      const numberOfParticles = Math.max((canvas.width * canvas.height) / 10000, 80)
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }
    initParticles()

    // Connect particles
    const connectParticles = () => {
      const maxDistance = 150
      const mouseMaxDistance = 250

      for (let a = 0; a < particles.length; a++) {
        // Skip if particle A is not in dark section
        if (!isInDarkSection(particles[a].y)) continue

        // Connect to other particles
        for (let b = a + 1; b < particles.length; b++) {
          // Skip if particle B is not in dark section
          if (!isInDarkSection(particles[b].y)) continue

          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Check if both particles are near mouse
          let nearMouse = false
          let mouseProximity = 0
          if (mouse.x != null && mouse.y != null) {
            const dxA = mouse.x - particles[a].x
            const dyA = mouse.y - particles[a].y
            const distA = Math.sqrt(dxA * dxA + dyA * dyA)
            const dxB = mouse.x - particles[b].x
            const dyB = mouse.y - particles[b].y
            const distB = Math.sqrt(dxB * dxB + dyB * dyB)
            
            if (distA < mouseMaxDistance && distB < mouseMaxDistance) {
              nearMouse = true
              mouseProximity = 1 - Math.max(distA, distB) / mouseMaxDistance
            }
          }

          const effectiveMaxDistance = nearMouse ? maxDistance * 1.5 : maxDistance

          if (distance < effectiveMaxDistance) {
            const opacity = (1 - distance / effectiveMaxDistance) * (nearMouse ? 0.8 : 0.3)
            const lineWidth = nearMouse ? 1.5 + mouseProximity : 1

            ctx.strokeStyle = `rgba(74, 144, 226, ${opacity})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }

        // Connect particles to mouse (only if mouse is in dark section)
        if (mouse.x != null && mouse.y != null && isInDarkSection(mouse.y)) {
          const dx = mouse.x - particles[a].x
          const dy = mouse.y - particles[a].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseMaxDistance) {
            const opacity = (1 - distance / mouseMaxDistance) * 0.5
            ctx.strokeStyle = `rgba(74, 144, 226, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Mouse move event
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-background" />
}

export default ParticleBackground
