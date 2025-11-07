import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PokemonDetail.css'

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await response.json()
        setPokemon(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [name])

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]')
    if (!favorites.includes(name)) {
      favorites.push(name)
      localStorage.setItem('pokemonFavorites', JSON.stringify(favorites))
      alert(`${name} added to favorites!`)
    } else {
      alert(`${name} is already in favorites!`)
    }
  }

  if (loading) {
    return <div className="loading">Loading Pokemon details...</div>
  }

  if (!pokemon) {
    return <div className="error">Pokemon not found!</div>
  }

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail-header">
        <Link to="/pokemon" className="btn btn-small">← Back to List</Link>
        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <button onClick={handleAddToFavorites} className="btn btn-favorite">
          Add to Favorites
        </button>
      </div>

      <div className="pokemon-detail-content">
        <div className="pokemon-detail-image">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
        </div>

        <div className="pokemon-detail-info">
          <div className="pokemon-detail-section">
            <h3>Basic Info</h3>
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
          </div>

          <div className="pokemon-detail-section">
            <h3>Types</h3>
            <div className="pokemon-types">
              {pokemon.types.map(type => (
                <span key={type.type.name} className={`type ${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pokemon-detail-section">
            <h3>Stats</h3>
            <div className="pokemon-stats">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="stat">
                  <span className="stat-name">
                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:
                  </span>
                  <span className="stat-value">{stat.base_stat}</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
