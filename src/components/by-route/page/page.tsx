import { useQuery } from '@tanstack/react-query';
import { Route } from '@/routes/spaces/$spaceKey/$pageId';

import { SidebarProvider } from '@/components/ui/sidebar';
import { fetchConfluencePage } from '@/lib/api';

import { PageSidebar } from './page-sidebar';
import { PageSidebarInset } from './page-sidebar-inset';

export function PageComponent() {
  const { pageId } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['confluencePage', pageId],
    queryFn: () => fetchConfluencePage(pageId),
  });

  console.log(data);

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
              </div>
            )}
          </div>
        </PageSidebarInset>
      </PageSidebar>
    </SidebarProvider>
  );
}
