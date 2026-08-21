import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <><PageHeader eyebrow="Community pulse" title="Leaderboard" description="A little friendly pressure, measured in points." /><CollectionState {...state}><div className="table-responsive data-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Rank</th><th>Athlete</th><th>Points</th><th>Trend</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry._id}><td className="rank">{entry.rank}</td><td>{entry.userName}</td><td>{entry.points.toLocaleString()}</td><td><span className={`trend trend-${entry.trend}`}>{entry.trend}</span></td></tr>)}</tbody></table></div>{entries.length === 0 && <p className="empty-state">The leaderboard is waiting for its first score.</p>}</CollectionState></>
}