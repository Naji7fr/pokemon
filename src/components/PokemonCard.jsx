import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PokemonCard.css'

function PokemonCard({ pokemon, index }) {
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()
        setPokemonData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [pokemon.name])

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]')
    if (!favorites.includes(pokemon.name)) {
      favorites.push(pokemon.name)
      localStorage.setItem('pokemonFavorites', JSON.stringify(favorites))
      alert(`${pokemon.name} added to favorites!`)
    } else {
      alert(`${pokemon.name} is already in favorites!`)
    }
  }

  if (loading || !pokemonData) {
    return <div className="pokemon-card loading">Loading...</div>
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img 
          src={pokemonData.sprites.front_default} 
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>#{index.toString().padStart(3, '0')}</p>
        <div className="pokemon-types">
          {pokemonData.types.map(type => (
            <span key={type.type.name} className={`type ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="pokemon-actions">
        <Link to={`/pokemon/${pokemon.name}`} className="btn btn-small">
          View Details
        </Link>
        <button onClick={handleAddToFavorites} className="btn btn-small btn-favorite">
          Add to Favorites
        </button>
      </div>
    </div>
  )
}

export default PokemonCard
