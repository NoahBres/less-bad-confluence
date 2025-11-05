import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/spaces/$spaceKey')({
  component: SpaceComponent,
})

function SpaceComponent() {
  const { spaceKey } = Route.useParams()
  return (
    <div>
      <h1>Space: {spaceKey}</h1>
      <nav>
        <Link to="/">&larr; Back to Home</Link>
      </nav>

      <div>
        <h2>Pages in this Space</h2>
        <ul>
          <li>
            <Link
              to="/spaces/$spaceKey/$pageId"
              params={{ spaceKey, pageId: 'getting-started' }}
            >
              Getting Started
            </Link>
          </li>
          <li>
            <Link to="/spaces/$spaceKey/$pageId" params={{ spaceKey, pageId: 'overview' }}>
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/spaces/$spaceKey/$pageId"
              params={{ spaceKey, pageId: 'documentation' }}
            >
              Documentation
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <button>Create New Page</button>
      </div>
    </div>
  )
}