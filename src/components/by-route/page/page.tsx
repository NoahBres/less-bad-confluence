import { SidebarProvider } from '@/components/ui/sidebar';

import { PageSidebar } from './page-sidebar';
import { PageSidebarInset } from './page-sidebar-inset';

export function PageComponent() {
  // const { spaceKey, pageId } = Route.useParams();

  return (
    <SidebarProvider defaultOpen={true} defaultWidth="25rem">
      <PageSidebar>
        <PageSidebarInset>
          <div>content</div>
        </PageSidebarInset>
      </PageSidebar>
    </SidebarProvider>
  );
}
