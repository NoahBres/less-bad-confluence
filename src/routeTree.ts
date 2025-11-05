import React from 'react';

import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router';

import { Home } from './pages/Home';
import { Page } from './pages/Page';
import { Space } from './pages/Space';

// Root route
export const rootRoute = createRootRoute({
  component: () => React.createElement(Outlet),
});

// Home route
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Spaces route
export const spacesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/spaces',
});

// Individual space route
export const spaceRoute = createRoute({
  getParentRoute: () => spacesRoute,
  path: '/$spaceKey',
  component: function SpaceComponent() {
    const { spaceKey } = spaceRoute.useParams();
    return React.createElement(Space, { spaceKey });
  },
});

// Pages route under a space
export const pagesRoute = createRoute({
  getParentRoute: () => spaceRoute,
  path: '/pages',
});

// Individual page route
export const pageRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: '/$pageId',
  component: function PageComponent() {
    const { spaceKey, pageId } = pageRoute.useParams();
    return React.createElement(Page, { spaceKey, pageId });
  },
});

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  spacesRoute.addChildren([spaceRoute.addChildren([pagesRoute.addChildren([pageRoute])])]),
]);
