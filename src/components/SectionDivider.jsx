import React from 'react'
import './SectionDivider.css'

function SectionDivider() {
  return (
    <div className="section-divider">
      <div className="divider-line left"></div>
      <div className="divider-center">
        <div className="divider-dot"></div>
        <div className="divider-ring"></div>
      </div>
      <div className="divider-line right"></div>
    </div>
  )
}

export default SectionDivider
