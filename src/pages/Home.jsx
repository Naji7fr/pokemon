import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Pokemon Team Manager</h1>
        <p>Manage your Pokemon teams, discover new Pokemon, and keep track of your favorites!</p>
        <div className="home-buttons">
          <Link to="/pokemon" className="btn btn-primary">Browse Pokemon</Link>
          <Link to="/teams" className="btn btn-secondary">My Teams</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Explore Pokemon</h3>
          <p>Browse through hundreds of Pokemon from the PokeAPI</p>
        </div>
        <div className="feature-card">
          <h3>Favorites</h3>
          <p>Keep track of your favorite Pokemon for quick access</p>
        </div>
        <div className="feature-card">
          <h3>Team Management</h3>
          <p>Create and manage your Pokemon teams</p>
        </div>
      </div>
    </div>
  )
}

export default Home
