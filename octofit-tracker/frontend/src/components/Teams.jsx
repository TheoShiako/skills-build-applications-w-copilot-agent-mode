import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

// Codespaces endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    let cancelled = false

    fetchCollection('teams')
      .then((items) => { if (!cancelled) setTeams(items) })
      .catch((error) => { if (!cancelled) setState({ loading: false, error: error.message }) })
      .finally(() => { if (!cancelled) setState((current) => ({ ...current, loading: false })) })

    return () => { cancelled = true }
  }, [])
  return <><PageHeader eyebrow="Find your people" title="Teams" description="Train together, keep each other moving." /><CollectionState {...state}><div className="row g-3">{teams.map((team) => <article className="col-md-6" key={team._id}><div className="data-card h-100"><span className="tag">{team.focus}</span><h2>{team.name}</h2><p>{team.description || 'A focused OctoFit crew.'}</p><small>Captain: {team.captainId?.name || 'Unassigned'} · {team.members?.length || 0} members</small></div></article>)}</div>{teams.length === 0 && <p className="empty-state">No teams have formed yet.</p>}</CollectionState></>
}