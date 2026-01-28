import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
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
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">SUBMIT</button>
        </form>

        <div className="contact-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="mailto:taras@example.com" className="social-link">
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
