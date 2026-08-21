const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// Local development stays usable without producing an undefined Codespaces URL.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(component) {
  const response = await fetch(`${API_BASE_URL}/api/${component}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs
  return []
}