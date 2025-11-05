import React from 'react';
import { RouterProvider, createRouter, Outlet, createRootRoute, createRoute } from '@tanstack/react-router';

import { Home } from './pages/Home';
import { Page } from './pages/Page';
import { Space } from './pages/Space';

// Root route
const rootRoute = createRootRoute({
  component: () => React.createElement(Outlet),
});

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Spaces route
const spacesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/spaces',
});

// Individual space route
const spaceRoute = createRoute({
  getParentRoute: () => spacesRoute,
  path: '/$spaceKey',
  component: function SpaceComponent() {
    const { spaceKey } = spaceRoute.useParams();
    return React.createElement(Space, { spaceKey });
  },
});

// Pages route under a space
const pagesRoute = createRoute({
  getParentRoute: () => spaceRoute,
  path: '/pages',
});

// Individual page route
const pageRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: '/$pageId',
  component: function PageComponent() {
    const { spaceKey, pageId } = pageRoute.useParams();
    return React.createElement(Page, { spaceKey, pageId });
  },
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  spacesRoute.addChildren([spaceRoute.addChildren([pagesRoute.addChildren([pageRoute])])]),
]);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
