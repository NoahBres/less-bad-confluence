import { FileText, FolderOpen, Home } from 'lucide-react';

import * as React from 'react';

import { Link, createFileRoute } from '@tanstack/react-router';

import { NavMain } from '@/components/nav-main';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Route = createFileRoute('/spaces/$spaceKey/$pageId')({
  component: PageComponent,
});

function PageComponent() {
  const { spaceKey, pageId } = Route.useParams();

  const data = {
    navMain: [
      {
        title: 'Home',
        url: '/',
        icon: Home,
        isActive: false,
      },
      {
        title: 'Spaces',
        url: '#',
        icon: FolderOpen,
        isActive: true,
        items: [
          {
            title: 'Getting Started',
            url: '#',
          },
          {
            title: 'Overview',
            url: '#',
          },
          {
            title: 'Documentation',
            url: '#',
          },
          {
            title: 'Sample Page',
            url: '#',
          },
        ],
      },
    ],
  };

  const sidebarData = React.useMemo(() => {
    if (spaceKey) {
      return {
        navMain: [
          {
            title: 'Home',
            url: '/',
            icon: Home,
            isActive: false,
          },
          {
            title: spaceKey,
            url: `/spaces/${spaceKey}`,
            icon: FolderOpen,
            isActive: true,
            items: [
              {
                title: 'Getting Started',
                url: `/spaces/${spaceKey}/getting-started`,
                isActive: pageId === 'getting-started',
              },
              {
                title: 'Overview',
                url: `/spaces/${spaceKey}/overview`,
                isActive: pageId === 'overview',
              },
              {
                title: 'Documentation',
                url: `/spaces/${spaceKey}/documentation`,
                isActive: pageId === 'documentation',
              },
              {
                title: 'Sample Page',
                url: `/spaces/${spaceKey}/sample-page`,
                isActive: pageId === 'sample-page',
              },
            ],
          },
        ],
      };
    }
    return data;
  }, [spaceKey, pageId]);

  return (
    <SidebarProvider>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-w-screen rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25}>
          <Sidebar collapsible="none">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2 py-1 text-lg font-semibold">
                <FileText className="h-6 w-6" />
                <span>Less Bad Confluence</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <NavMain items={sidebarData.navMain} />
            </SidebarContent>
            <SidebarFooter>footer</SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to="/spaces/$spaceKey" params={{ spaceKey }}>
                        {spaceKey}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageId}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <main className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
