import { createFileRoute } from '@tanstack/react-router';

import { PageComponent } from '@/components/by-route/page/page';

export const Route = createFileRoute('/spaces/$spaceKey/$pageId')({
  component: PageComponent,
});
