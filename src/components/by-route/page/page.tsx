import { useQuery } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';
import { fetchConfluencePage } from '@/lib/api';

import { PageSidebar } from './page-sidebar';
import { PageSidebarInset } from './page-sidebar-inset';

export function PageComponent() {
  // const { spaceKey, pageId } = Route.useParams();
  const pageId = '469181918';

  const { data, isLoading, error } = useQuery({
    queryKey: ['confluencePage', pageId],
    queryFn: () => fetchConfluencePage(pageId),
  });

  return (
    <SidebarProvider defaultOpen={true} defaultWidth="25rem">
      <PageSidebar>
        <PageSidebarInset>
          <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
              <div>
                <h1>{data.title}</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
          </div>
        </PageSidebarInset>
      </PageSidebar>
    </SidebarProvider>
  );
}
