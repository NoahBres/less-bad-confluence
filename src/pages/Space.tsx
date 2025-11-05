import { Link } from '@tanstack/react-router';

interface SpaceProps {
  spaceKey: string;
}

export function Space({ spaceKey }: SpaceProps) {
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
              to="/spaces/$spaceKey/pages/$pageId"
              params={{ spaceKey, pageId: 'getting-started' }}
            >
              Getting Started
            </Link>
          </li>
          <li>
            <Link to="/spaces/$spaceKey/pages/$pageId" params={{ spaceKey, pageId: 'overview' }}>
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/spaces/$spaceKey/pages/$pageId"
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
  );
}
