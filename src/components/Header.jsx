import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Pokemon Team Manager</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/pokemon" className="nav-link">Pokemon</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
