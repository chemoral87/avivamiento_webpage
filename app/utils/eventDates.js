export const normalizeEventDates = (event) => event ? ({
  ...event,
  start_date: event.start_date ?? event.publish_date ?? null,
  end_date: event.end_date ?? event.event_date ?? null,
  publish_date: event.publish_date ?? event.start_date ?? null,
  event_date: event.event_date ?? event.end_date ?? null,
}) : null

// Excludes events whose name contains a given keyword (case-insensitive).
// Used by the carousel to hide events like "Servicio General".
export const excludeEventsByNameKeyword = (events = [], keyword = '') => {
  const needle = keyword.trim().toLowerCase()
  if (!needle) return events
  return events.filter(event => !event?.name?.toLowerCase().includes(needle))
}

// Groups events that share the same name into a single entry, collecting
// every distinct event_date under `event_dates` (sorted ascending).
// The first occurrence's other fields (image, description, location, etc.)
// are kept as the representative values for the group.
export const groupEventsByName = (events = []) => {
  const groups = new Map()

  for (const event of events) {
    const key = event?.name
    if (!key) continue

    if (!groups.has(key)) {
      groups.set(key, { ...event, event_dates: [] })
    }

    const group = groups.get(key)
    const date = event.event_date
    if (date && !group.event_dates.includes(date)) {
      group.event_dates.push(date)
    }
  }

  return Array.from(groups.values()).map(group => ({
    ...group,
    event_dates: group.event_dates.sort()
  }))
}
