import React, { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import './PokemonList.css'

function PokemonList() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await response.json()
        setPokemon(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const filteredPokemon = pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="loading">Loading Pokemon...</div>
  }

  return (
    <div className="pokemon-list">
      <h1>Pokemon Collection</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map((p, index) => (
          <PokemonCard key={p.name} pokemon={p} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default PokemonList
