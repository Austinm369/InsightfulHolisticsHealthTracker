import React from 'react'
import { TrackerWidget } from './widgets/TrackerWidget'
import { useTrackers } from '../hooks/useTrackers'

export function HealthTrackers() {
  const { trackers } = useTrackers()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {trackers.map(tracker => (
        <TrackerWidget key={tracker.id} {...tracker} />
      ))}
    </div>
  )
}