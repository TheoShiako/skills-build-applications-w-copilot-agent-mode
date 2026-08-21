export function CollectionState({ loading, error, children }) {
  if (loading) return <p className="status-message">Loading your OctoFit data...</p>
  if (error) return <div className="alert alert-warning" role="alert">{error}</div>
  return children
}

export function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="page-heading mb-4">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </div>
  )
}