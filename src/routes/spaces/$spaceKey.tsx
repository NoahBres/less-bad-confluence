import { createFileRoute } from '@tanstack/react-router'
import { Space } from '../../pages/Space'

export const Route = createFileRoute('/spaces/$spaceKey')({
  component: function SpaceComponent() {
    const { spaceKey } = Route.useParams()
    return <Space spaceKey={spaceKey} />
  },
})