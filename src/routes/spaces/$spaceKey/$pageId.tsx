import { createFileRoute, Link } from '@tanstack/react-router'
import EditorPage from '../../../EditorPage'

export const Route = createFileRoute('/spaces/$spaceKey/$pageId')({
  component: PageComponent,
})

function PageComponent() {
  const { spaceKey, pageId } = Route.useParams()
  return (
    <div>
      <nav
        style={{
          marginBottom: '20px',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px',
        }}
      >
        <Link to="/">&larr; Home</Link>
        {' / '}
        <Link to="/spaces/$spaceKey" params={{ spaceKey }}>
          {spaceKey}
        </Link>
        {' / '}
        <span>{pageId}</span>
      </nav>

      <div style={{ marginBottom: '20px' }}>
        <h1>Page: {pageId}</h1>
        <p>
          Space: <strong>{spaceKey}</strong>
        </p>
      </div>

      <EditorPage />
    </div>
  )
}