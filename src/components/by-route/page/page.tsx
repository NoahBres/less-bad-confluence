import { useQuery } from '@tanstack/react-query';
import { Route } from '@/routes/spaces/$spaceKey/$pageId';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchConfluencePage } from '@/lib/api';

import { PageSidebar } from './page-sidebar';
import { PageSidebarInset } from './page-sidebar-inset';
import EditorPage from '@/EditorPage';

export function PageComponent() {
  const { pageId } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['confluencePage', pageId],
    queryFn: () => fetchConfluencePage(pageId),
  });

  return (
    <SidebarProvider defaultOpen={true} defaultWidth="25rem">
      <PageSidebar>
        <PageSidebarInset title={data?.title}>
          <div>
            {isLoading && (
              <div className="max-w-3xl mx-auto px-4 py-8">
                <Skeleton className="h-10 w-3/4 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            )}
            {error && <div>Error: {error.message}</div>}
            {data && (
              <main className="max-w-3xl mx-auto px-4 py-8 prose prose-slate">
                <h1 className="text-3xl font-medium tracking-tight text-gray-950 dark:text-white mb-6">{data.title}</h1>
                <article className="">
                  <EditorPage content={data.body.view.value} />
                </article>
              </main>
            )}
          </div>
        </PageSidebarInset>
      </PageSidebar>
    </SidebarProvider>
  );
}
