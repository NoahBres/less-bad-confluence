import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-foreground mb-4 text-4xl font-bold">Less Bad Confluence</h1>
        <p className="text-muted-foreground mb-8 text-lg">Welcome to your confluence workspace.</p>

        <div className="space-y-6">
          <h2 className="text-foreground text-2xl font-semibold">Recent Spaces</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/spaces/$spaceKey"
                params={{ spaceKey: 'DEMO' }}
                className="text-primary hover:text-primary/80 text-lg underline transition-colors"
              >
                Demo Space
              </Link>
            </li>
            <li>
              <Link
                to="/spaces/$spaceKey"
                params={{ spaceKey: 'PROJ' }}
                className="text-primary hover:text-primary/80 text-lg underline transition-colors"
              >
                Project Space
              </Link>
            </li>
          </ul>

          <div className="border-border mt-8 border-t pt-6">
            <h2 className="text-foreground mb-4 text-2xl font-semibold">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/spaces/$spaceKey/$pageId"
                  params={{ spaceKey: 'TRSD', pageId: '272568861' }}
                  className="text-primary hover:text-primary/80 text-lg underline transition-colors"
                >
                  Sample Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
