import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Favorites.css'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]')
    setFavorites(savedFavorites)
    
    const fetchFavoritesData = async () => {
      if (savedFavorites.length > 0) {
        try {
          const promises = savedFavorites.map(name => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json())
          )
          const data = await Promise.all(promises)
          setPokemonData(data)
        } catch (error) {
          console.error('Error fetching favorites:', error)
        }
      }
      setLoading(false)
    }

    fetchFavoritesData()
  }, [])

  const removeFromFavorites = (pokemonName) => {
    const updatedFavorites = favorites.filter(name => name !== pokemonName)
    setFavorites(updatedFavorites)
    setPokemonData(pokemonData.filter(p => p.name !== pokemonName))
    localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites))
  }

  if (loading) {
    return <div className="loading">Loading favorites...</div>
  }

  return (
    <div className="favorites">
      <h1>My Favorite Pokemon</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet.</p>
          <Link to="/pokemon" className="btn btn-primary">Browse Pokemon</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {pokemonData.map(pokemon => (
            <div key={pokemon.name} className="favorite-card">
              <div className="favorite-image">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <div className="favorite-info">
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <div className="pokemon-types">
                  {pokemon.types.map(type => (
                    <span key={type.type.name} className={`type ${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="favorite-actions">
                <Link to={`/pokemon/${pokemon.name}`} className="btn btn-small">
                  View Details
                </Link>
                <button 
                  onClick={() => removeFromFavorites(pokemon.name)}
                  className="btn btn-small btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
