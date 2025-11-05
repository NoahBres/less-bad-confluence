import { FileText, FolderOpen, Home } from 'lucide-react';

import { Link, createFileRoute } from '@tanstack/react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Route = createFileRoute('/spaces/$spaceKey/$pageId')({
  component: PageComponent,
});

function PageComponent() {
  const { spaceKey, pageId } = Route.useParams();

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2 px-2 py-1 text-lg font-semibold">
            Less Bad Confluence
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link to="/spaces/$spaceKey" params={{ spaceKey }}>
                      <FolderOpen className="h-4 w-4" />
                      <span>{spaceKey}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Pages in {spaceKey}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/spaces/$spaceKey/$pageId"
                      params={{ spaceKey, pageId: 'getting-started' }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Getting Started</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/spaces/$spaceKey/$pageId" params={{ spaceKey, pageId: 'overview' }}>
                      <FileText className="h-4 w-4" />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/spaces/$spaceKey/$pageId"
                      params={{ spaceKey, pageId: 'documentation' }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Documentation</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pageId === 'sample-page'}>
                    <Link
                      to="/spaces/$spaceKey/$pageId"
                      params={{ spaceKey, pageId: 'sample-page' }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>sample-page</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-gray-200" />
          <nav className="text-muted-foreground flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link to="/spaces/$spaceKey" params={{ spaceKey }} className="hover:text-foreground">
              {spaceKey}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{pageId}</span>
          </nav>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <h1 className="text-3xl font-bold">Page: {pageId}</h1>
            {/*<p className="text-muted-foreground">*/}
            <p className="text-red-500">
              Space: <strong>{spaceKey}</strong> yuhhh
            </p>
          </div>
        </div>
      </SidebarInset>
      yuh
    </SidebarProvider>
  );
}
