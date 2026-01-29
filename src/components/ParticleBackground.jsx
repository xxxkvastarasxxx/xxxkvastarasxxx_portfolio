import React, { useEffect, useRef } from 'react'
import './ParticleBackground.css'

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId
    let particles = []
    const mouse = { x: null, y: null, radius: 150 }
    
    // Detect if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Set canvas size with device pixel ratio for sharpness
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    
    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
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
        this.x = Math.random() * (canvas.width / dpr)
        this.y = Math.random() * (canvas.height / dpr)
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 2 + 1.5
        this.speedX = Math.random() * 0.4 - 0.2
        this.speedY = Math.random() * 0.4 - 0.2
        this.density = Math.random() * 30 + 1
      }

      update() {
        // Base movement
        this.baseX += this.speedX
        this.baseY += this.speedY

        // Bounce off edges
        if (this.baseX > canvas.width / dpr || this.baseX < 0) {
          this.speedX = -this.speedX
        }
        if (this.baseY > canvas.height / dpr || this.baseY < 0) {
          this.speedY = -this.speedY
        }

        // Check if in dots-only section (no mouse interaction there)
        const inDotsOnlySection = isInDotsOnlySection(this.y) && !isInDarkSection(this.y)

        // Mouse/touch interaction - push particles away (only in Hero/Contact)
        if (mouse.x != null && mouse.y != null && !inDotsOnlySection) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = mouse.radius
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const moveX = forceDirectionX * force * this.density * 0.5
            const moveY = forceDirectionY * force * this.density * 0.5

            this.x = this.baseX - moveX
            this.y = this.baseY - moveY
          } else {
            // Smoothly return to base position - faster response
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 6
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 6
            }
          }
        } else {
          // Return to base when mouse leaves - faster response
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 8
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 8
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
          ctx.fillStyle = 'rgba(74, 144, 226, 0.5)'
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          return
        }

        // For Hero/Contact sections - cleaner effect without heavy blur
        let glowIntensity = 0
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            glowIntensity = 1 - distance / mouse.radius
          }
        }

        // Draw outer glow (only when interacting, and lighter)
        if (glowIntensity > 0.1) {
          ctx.fillStyle = `rgba(74, 144, 226, ${glowIntensity * 0.3})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw main particle
        ctx.fillStyle = `rgba(74, 144, 226, ${0.7 + glowIntensity * 0.3})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size + glowIntensity * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - fewer on mobile for performance
    const initParticles = () => {
      particles = []
      const baseCount = (canvas.width * canvas.height) / (dpr * dpr) / 10000
      const numberOfParticles = isMobile 
        ? Math.min(Math.max(baseCount * 0.6, 40), 60)
        : Math.max(baseCount, 80)
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

    // Touch events for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }

    const handleTouchEnd = () => {
      // Delay clearing to allow smooth animation
      setTimeout(() => {
        mouse.x = null
        mouse.y = null
      }, 100)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchcancel', handleTouchEnd)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-background" />
}

export default ParticleBackground
