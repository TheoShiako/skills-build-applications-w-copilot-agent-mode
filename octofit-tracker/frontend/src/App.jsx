import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigationItems = [
  ['leaderboard', 'Leaderboard'],
  ['activities', 'Activities'],
  ['workouts', 'Workouts'],
  ['teams', 'Teams'],
  ['users', 'Users'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <NavLink className="brand" to="/leaderboard">OctoFit <span>Tracker</span></NavLink>
          <nav className="nav-pills" aria-label="Primary navigation">
            {navigationItems.map(([path, label]) => (
              <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={`/${path}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/leaderboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
