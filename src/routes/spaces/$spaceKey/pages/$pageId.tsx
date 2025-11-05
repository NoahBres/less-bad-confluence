import { createFileRoute } from '@tanstack/react-router'
import { Page } from '../../../../pages/Page'

export const Route = createFileRoute('/spaces/$spaceKey/pages/$pageId')({
  component: function PageComponent() {
    const { spaceKey, pageId } = Route.useParams()
    return <Page spaceKey={spaceKey} pageId={pageId} />
  },
})