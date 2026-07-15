import { describe, it, expect } from 'vitest'
import { normalizeEventDates, excludeEventsByNameKeyword, groupEventsByName } from '../eventDates'

// ── Fixtures ──────────────────────────────────────────────────────────────

const fullEvent = {
  id: 1,
  name: 'Reunión General',
  start_date: '2026-07-01',
  end_date: '2026-07-15',
  publish_date: '2026-06-20',
  event_date: '2026-07-15',
}

const partialEvent = {
  id: 2,
  name: 'Campamento de Verano',
  start_date: '2026-07-01',
  // no end_date, no publish_date, no event_date
}

const eventsFixture = [
  { name: 'ITAM',         event_date: '2026-07-20', location: 'A', description: 'Clases' },
  { name: 'ITAM',         event_date: '2026-07-27', location: 'A', description: 'Clases' },
  { name: 'Campamento',   event_date: '2026-07-20', location: 'B', description: 'Verano' },
  { name: 'Campamento',   event_date: '2026-07-21', location: 'B', description: 'Verano' },
  { name: 'ITAM',         event_date: '2026-07-20', location: 'C', description: 'Dup date' },
  { name: 'Reunión General', event_date: '2026-07-19', location: 'D' },
]

// ── normalizeEventDates ──────────────────────────────────────────────────

describe('normalizeEventDates', () => {
  it('returns null for null/undefined input', () => {
    expect(normalizeEventDates(null)).toBeNull()
    expect(normalizeEventDates(undefined)).toBeNull()
  })

  it('preserves existing dates and fills missing ones with fallbacks', () => {
    const result = normalizeEventDates(fullEvent)
    expect(result.start_date).toBe('2026-07-01')
    expect(result.end_date).toBe('2026-07-15')
    expect(result.publish_date).toBe('2026-06-20')
    expect(result.event_date).toBe('2026-07-15')
  })

  it('falls back start_date → publish_date → null', () => {
    const e = { publish_date: '2026-05-01' }
    expect(normalizeEventDates(e).start_date).toBe('2026-05-01')
  })

  it('falls back end_date → event_date → null', () => {
    const e = { event_date: '2026-08-01' }
    expect(normalizeEventDates(e).end_date).toBe('2026-08-01')
  })

  it('falls back publish_date → start_date → null', () => {
    const e = { start_date: '2026-04-15' }
    expect(normalizeEventDates(e).publish_date).toBe('2026-04-15')
  })

  it('falls back event_date → end_date → null', () => {
    const e = { end_date: '2026-09-10' }
    expect(normalizeEventDates(e).event_date).toBe('2026-09-10')
  })

  it('sets missing fields to null when no fallback exists', () => {
    const result = normalizeEventDates(partialEvent)
    // end_date falls back to event_date (null) → null
    expect(result.end_date).toBeNull()
    // event_date falls back to end_date (undefined) → null
    expect(result.event_date).toBeNull()
    // publish_date falls back to start_date → '2026-07-01'
    expect(result.publish_date).toBe('2026-07-01')
  })

  it('returns a new object (shallow copy) without mutating the original', () => {
    const original = { id: 1, start_date: '2026-01-01' }
    const result = normalizeEventDates(original)
    expect(result).not.toBe(original)
    expect(result.id).toBe(1)
  })
})

// ── excludeEventsByNameKeyword ───────────────────────────────────────────

describe('excludeEventsByNameKeyword', () => {
  it('returns the same array when keyword is empty', () => {
    const arr = [{ name: 'Foo' }]
    expect(excludeEventsByNameKeyword(arr, '')).toBe(arr)
    expect(excludeEventsByNameKeyword(arr, '   ')).toBe(arr)
  })

  it('filters out events whose name contains the keyword (case-insensitive)', () => {
    const events = [
      { name: 'Reunión General' },
      { name: 'Campamento de Verano' },
      { name: 'Servicio General' },
    ]
    const result = excludeEventsByNameKeyword(events, 'General')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Campamento de Verano')
  })

  it('is case-insensitive', () => {
    const events = [{ name: 'Reunion GENERAL' }, { name: 'Campamento' }]
    expect(excludeEventsByNameKeyword(events, 'general')).toHaveLength(1)
  })

  it('handles events with missing name safely', () => {
    const events = [{ name: 'Keep' }, {}, { name: 'General' }]
    const result = excludeEventsByNameKeyword(events, 'General')
    expect(result).toHaveLength(2) // {} passes through (no name to match)
  })

  it('returns empty array when all events are excluded', () => {
    const events = [{ name: 'General' }]
    expect(excludeEventsByNameKeyword(events, 'General')).toHaveLength(0)
  })

  it('returns empty array when input is empty', () => {
    expect(excludeEventsByNameKeyword([])).toEqual([])
  })
})

// ── groupEventsByName ────────────────────────────────────────────────────

describe('groupEventsByName', () => {
  it('groups events by name and collects event_dates', () => {
    const result = groupEventsByName(eventsFixture)

    const itam = result.find(g => g.name === 'ITAM')
    expect(itam).toBeDefined()
    expect(itam.event_dates).toEqual(['2026-07-20', '2026-07-27'])

    const camp = result.find(g => g.name === 'Campamento')
    expect(camp).toBeDefined()
    expect(camp.event_dates).toEqual(['2026-07-20', '2026-07-21'])

    const general = result.find(g => g.name === 'Reunión General')
    expect(general).toBeDefined()
    expect(general.event_dates).toEqual(['2026-07-19'])
  })

  it('deduplicates event_dates using Set', () => {
    const events = [
      { name: 'ITAM', event_date: '2026-07-20' },
      { name: 'ITAM', event_date: '2026-07-20' }, // duplicate
    ]
    const result = groupEventsByName(events)
    expect(result[0].event_dates).toEqual(['2026-07-20'])
  })

  it('sorts event_dates ascending', () => {
    const events = [
      { name: 'Multi', event_date: '2026-07-30' },
      { name: 'Multi', event_date: '2026-07-10' },
      { name: 'Multi', event_date: '2026-07-20' },
    ]
    const result = groupEventsByName(events)
    expect(result[0].event_dates).toEqual(['2026-07-10', '2026-07-20', '2026-07-30'])
  })

  it('preserves first occurrence fields as group representative', () => {
    const events = [
      { name: 'ITAM', location: 'Location A', description: 'First' },
      { name: 'ITAM', location: 'Location B', description: 'Second' },
    ]
    const result = groupEventsByName(events)
    expect(result[0].location).toBe('Location A')
    expect(result[0].description).toBe('First')
  })

  it('skips events without a name', () => {
    const events = [
      { name: 'Valid', event_date: '2026-07-01' },
      { event_date: '2026-07-02' },     // no name
      { name: '', event_date: '2026-07-03' }, // empty name
      null,                              // null event
    ]
    const result = groupEventsByName(events)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Valid')
  })

  it('skips events without an event_date', () => {
    const events = [
      { name: 'No Date' },
      { name: 'Has Date', event_date: '2026-07-01' },
    ]
    const result = groupEventsByName(events)
    expect(result).toHaveLength(2)
    expect(result.find(g => g.name === 'No Date').event_dates).toEqual([])
    expect(result.find(g => g.name === 'Has Date').event_dates).toEqual(['2026-07-01'])
  })

  it('returns empty array for empty input', () => {
    expect(groupEventsByName([])).toEqual([])
    expect(groupEventsByName()).toEqual([])
  })
})
