import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

// Codespaces endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    let cancelled = false

    fetchCollection('users')
      .then((items) => { if (!cancelled) setUsers(items) })
      .catch((error) => { if (!cancelled) setState({ loading: false, error: error.message }) })
      .finally(() => { if (!cancelled) setState((current) => ({ ...current, loading: false })) })

    return () => { cancelled = true }
  }, [])
  return <><PageHeader eyebrow="The roster" title="Athletes" description="Meet the people making consistency a team sport." /><CollectionState {...state}><div className="row g-3">{users.map((user) => <article className="col-md-6 col-xl-4" key={user._id}><div className="data-card h-100"><div className="avatar">{user.name?.charAt(0).toUpperCase()}</div><h2>{user.name}</h2><p>{user.email}</p><small>{user.fitnessLevel} · {user.currentStreak} day streak</small></div></article>)}</div>{users.length === 0 && <p className="empty-state">No athletes are registered yet.</p>}</CollectionState></>
}