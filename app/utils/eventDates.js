/**
 * Normalizes date fields on an event object, filling missing dates with
 * fallback values from other date fields.
 *
 * @param {object|null} event - Raw event object from API
 * @returns {object|null} Normalized event with all date fields populated, or null
 */
export const normalizeEventDates = (event) => {
  if (!event) return null

  return {
    ...event,
    start_date: event.start_date ?? event.publish_date ?? null,
    end_date: event.end_date ?? event.event_date ?? null,
    publish_date: event.publish_date ?? event.start_date ?? null,
    event_date: event.event_date ?? event.end_date ?? null,
  }
}

/**
 * Filters out events whose name contains a given keyword (case-insensitive).
 * Used by the carousel to hide events like "Servicio General".
 *
 * @param {object[]} [events=[]] - Array of event objects
 * @param {string} [keyword=''] - Keyword to exclude by (case-insensitive)
 * @returns {object[]} Filtered events array
 */
export const excludeEventsByNameKeyword = (events = [], keyword = '') => {
  const needle = keyword.trim().toLowerCase()
  if (!needle) return events
  return events.filter(event => !event?.name?.toLowerCase().includes(needle))
}

/**
 * Groups events that share the same name into a single entry, collecting
 * every distinct event_date under `event_dates` (sorted ascending).
 * The first occurrence's other fields (image, description, location, etc.)
 * are kept as the representative values for the group.
 *
 * @param {object[]} [events=[]] - Array of event objects
 * @returns {object[]} Grouped events with event_dates array
 */
export const groupEventsByName = (events = []) => {
  const groups = new Map()

  for (const event of events) {
    const name = event?.name
    if (!name) continue

    let group = groups.get(name)
    if (!group) {
      group = { ...event, event_dates: new Set() }
      groups.set(name, group)
    }

    if (event.event_date) {
      group.event_dates.add(event.event_date)
    }
  }

  // Convert Sets to sorted arrays once, avoiding a second pass with .map()
  for (const group of groups.values()) {
    group.event_dates = [...group.event_dates].sort()
  }

  return Array.from(groups.values())
}
