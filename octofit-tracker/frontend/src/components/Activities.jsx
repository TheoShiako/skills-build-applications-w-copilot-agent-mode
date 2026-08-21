import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    let cancelled = false

    fetchCollection('activities')
      .then((items) => { if (!cancelled) setActivities(items) })
      .catch((error) => { if (!cancelled) setState({ loading: false, error: error.message }) })
      .finally(() => { if (!cancelled) setState((current) => ({ ...current, loading: false })) })

    return () => { cancelled = true }
  }, [])

  return <><PageHeader eyebrow="Movement log" title="Recent activities" description="See how the community is putting in the work." /><CollectionState {...state}><div className="row g-3">{activities.map((activity) => <article className="col-md-6 col-xl-4" key={activity._id}><div className="data-card h-100"><span className="tag">{activity.type}</span><h2>{activity.userId?.name || 'OctoFit member'}</h2><p>{activity.durationMinutes} minutes · {activity.caloriesBurned} calories</p><small>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Date unavailable'}</small></div></article>)}</div>{activities.length === 0 && <p className="empty-state">No activities recorded yet.</p>}</CollectionState></>
}