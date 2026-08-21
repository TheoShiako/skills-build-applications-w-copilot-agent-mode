import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

// Codespaces endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    let cancelled = false

    fetchCollection('workouts')
      .then((items) => { if (!cancelled) setWorkouts(items) })
      .catch((error) => { if (!cancelled) setState({ loading: false, error: error.message }) })
      .finally(() => { if (!cancelled) setState((current) => ({ ...current, loading: false })) })

    return () => { cancelled = true }
  }, [])
  return <><PageHeader eyebrow="Suggested for you" title="Workouts" description="Pick a session that fits the energy you have today." /><CollectionState {...state}><div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id}><div className="data-card h-100"><div className="d-flex justify-content-between gap-2"><span className="tag">{workout.focusArea}</span><small>{workout.durationMinutes} min</small></div><h2>{workout.title}</h2><p>{workout.description || 'A purposeful session from the OctoFit coaching team.'}</p><small>{workout.difficulty} · {workout.coach}</small></div></article>)}</div>{workouts.length === 0 && <p className="empty-state">No workouts are available yet.</p>}</CollectionState></>
}