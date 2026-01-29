import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // EmailJS credentials
    const serviceID = 'service_ltokro8'
    const templateID = 'template_eirkokx'
    const publicKey = '72vkdanAwM1C9zbse'

    // Initialize EmailJS with public key
    emailjs.init(publicKey)

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    }

    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text)
        alert('Thank you for your message! I will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.error('FAILED...', error)
        alert('Oops! Something went wrong. Please try again or email me directly.')
        setIsSubmitting(false)
      })
  }

  return (
    <section className="contact" id="contact">
      <h2>Contact<span className="heading-accent"></span></h2>
      <div className="contact-content">
        <p className="contact-intro">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              rows="1"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </button>
        </form>

        <div className="contact-links">
          <a href="https://github.com/xxxkvastarasxxx" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/taras-tymoshenko-861262386/" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
          <a href="mailto:taras.tymoshenko.developer@gmail.com" className="social-link">
            Email
          </a>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="social-link cv-link">
            CV
          </a>
        </div>

        <footer className="footer">
          <p>TARAS TYMOSHENKO</p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
