import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Teams.css'

function Teams() {
  const [teams, setTeams] = useState([])
  const [newTeamName, setNewTeamName] = useState('')
  const [favorites, setFavorites] = useState([])
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem('pokemonTeams') || '[]')
    const savedFavorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]')
    setTeams(savedTeams)
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
    }

    fetchFavoritesData()
  }, [])

  const createTeam = () => {
    if (newTeamName.trim()) {
      const newTeam = {
        id: Date.now(),
        name: newTeamName.trim(),
        pokemon: []
      }
      const updatedTeams = [...teams, newTeam]
      setTeams(updatedTeams)
      localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
      setNewTeamName('')
    }
  }

  const deleteTeam = (teamId) => {
    const updatedTeams = teams.filter(team => team.id !== teamId)
    setTeams(updatedTeams)
    localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
  }

  const addToTeam = (teamId, pokemonName) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId && !team.pokemon.includes(pokemonName)) {
        return { ...team, pokemon: [...team.pokemon, pokemonName] }
      }
      return team
    })
    setTeams(updatedTeams)
    localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
  }

  const removeFromTeam = (teamId, pokemonName) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return { ...team, pokemon: team.pokemon.filter(p => p !== pokemonName) }
      }
      return team
    })
    setTeams(updatedTeams)
    localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
  }

  return (
    <div className="teams">
      <h1>My Pokemon Teams</h1>

      <div className="create-team">
        <input
          type="text"
          placeholder="Enter team name..."
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="team-input"
        />
        <button onClick={createTeam} className="btn btn-primary">
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="empty-teams">
          <p>You haven't created any teams yet.</p>
          <Link to="/pokemon" className="btn btn-primary">Browse Pokemon</Link>
        </div>
      ) : (
        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-card">
              <div className="team-header">
                <h3>{team.name}</h3>
                <button 
                  onClick={() => deleteTeam(team.id)}
                  className="btn btn-small btn-danger"
                >
                  Delete Team
                </button>
              </div>

              <div className="team-pokemon">
                {team.pokemon.length === 0 ? (
                  <p className="empty-team">No Pokemon in this team yet</p>
                ) : (
                  <div className="team-pokemon-list">
                    {team.pokemon.map(pokemonName => {
                      const pokemon = pokemonData.find(p => p.name === pokemonName)
                      return pokemon ? (
                        <div key={pokemonName} className="team-pokemon-item">
                          <img src={pokemon.sprites.front_default} alt={pokemonName} />
                          <span>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</span>
                          <button 
                            onClick={() => removeFromTeam(team.id, pokemonName)}
                            className="btn btn-small btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </div>

              {favorites.length > 0 && (
                <div className="add-to-team">
                  <h4>Add Pokemon from Favorites:</h4>
                  <div className="favorites-selection">
                    {pokemonData.map(pokemon => (
                      <button
                        key={pokemon.name}
                        onClick={() => addToTeam(team.id, pokemon.name)}
                        className="btn btn-small"
                        disabled={team.pokemon.includes(pokemon.name)}
                      >
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
