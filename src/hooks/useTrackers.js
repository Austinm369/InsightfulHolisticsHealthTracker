import { useState, useEffect } from 'react'

const DEFAULT_TRACKERS = [
  { id: 'water', name: 'Water Intake', icon: '🥤', unit: 'glasses', goal: 8 },
  { id: 'steps', name: 'Daily Steps', icon: '👣', unit: 'steps', goal: 10000 },
  { id: 'meditation', name: 'Meditation', icon: '🧘', unit: 'minutes', goal: 20 }
]

export function useTrackers() {
  const [trackers] = useState(DEFAULT_TRACKERS)
  return { trackers }
}