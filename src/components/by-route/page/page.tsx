import { useState } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';

import { PageSidebar } from './page-sidebar';
import { PageSidebarInset } from './page-sidebar-inset';

export function PageComponent() {
  // const { spaceKey, pageId } = Route.useParams();

  const defaultOpen = true;
  const [sidebarWidth, setSidebarWidth] = useState('25rem');

  return (
    <SidebarProvider defaultOpen={defaultOpen} defaultWidth={sidebarWidth}>
      <PageSidebar>
        <PageSidebarInset>
          <div>content</div>
        </PageSidebarInset>
      </PageSidebar>
    </SidebarProvider>
  );
}
