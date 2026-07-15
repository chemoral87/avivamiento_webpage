import { describe, it, expect, beforeEach, vi } from 'vitest'

// ── Mock dependencies ─────────────────────────────────────────────────────

vi.mock('../httpClient', () => ({
  getClient: vi.fn(),
}))

vi.mock('../base64', () => ({
  encodeBase64: vi.fn(),
}))

vi.mock('../eventDates', () => ({
  normalizeEventDates: vi.fn((e) => e ?? null),
  groupEventsByName: vi.fn((events) => events ?? []),
  excludeEventsByNameKeyword: vi.fn((events, _kw) => events ?? []),
}))

vi.mock('../../constants/dates', () => ({
  WEEK_STARTS_ON_MONDAY: true,
}))

import { getClient } from '../httpClient'
import { encodeBase64 } from '../base64'
import {
  fetchPublicEvents,
  fetchSearchEvents,
  fetchPublicEventBySlug,
  fetchCarouselEvents,
} from '../calendarApi'

// ── Setup ─────────────────────────────────────────────────────────────────

const mockClient = {
  get: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
  encodeBase64.mockReturnValue('ZW5jb2RlZA==')
  getClient.mockReturnValue(mockClient)
  mockClient.get.mockReset()
})

const apiOptions = { orgId: 4, apiUrl: 'https://api.example.com' }

// ── fetchPublicEvents ─────────────────────────────────────────────────────

describe('fetchPublicEvents', () => {
  it('fetches events for a given month range', async () => {
    mockClient.get.mockResolvedValue({ data: [{ id: 1, name: 'Event' }] })

    const result = await fetchPublicEvents({ calYear: 2026, calMonth: 6, ...apiOptions })

    expect(encodeBase64).toHaveBeenCalledWith(4)
    expect(getClient).toHaveBeenCalledWith('https://api.example.com')
    expect(mockClient.get).toHaveBeenCalledWith('/church-event/public', {
      params: expect.objectContaining({
        org_id: 'ZW5jb2RlZA==',
        start_date: expect.any(String),
        end_date: expect.any(String),
      }),
    })
    expect(result).toEqual([{ id: 1, name: 'Event' }])
  })

  it('returns empty array when org_id encoding fails', async () => {
    encodeBase64.mockReturnValue(null)
    const result = await fetchPublicEvents({ calYear: 2026, calMonth: 6, ...apiOptions })
    expect(result).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty array when getClient returns null', async () => {
    getClient.mockReturnValue(null)
    const result = await fetchPublicEvents({ calYear: 2026, calMonth: 6, ...apiOptions })
    expect(result).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty array on API error', async () => {
    mockClient.get.mockRejectedValue(new Error('Network error'))
    const result = await fetchPublicEvents({ calYear: 2026, calMonth: 6, ...apiOptions })
    expect(result).toEqual([])
  })
})

// ── fetchSearchEvents ─────────────────────────────────────────────────────

describe('fetchSearchEvents', () => {
  it('fetches events matching a search query', async () => {
    mockClient.get.mockResolvedValue({ data: [{ id: 2, name: 'Campamento' }] })

    const result = await fetchSearchEvents({ query: 'Campamento', ...apiOptions })

    expect(mockClient.get).toHaveBeenCalledWith('/church-event/public', {
      params: { org_id: 'ZW5jb2RlZA==', search: 'Campamento' },
    })
    expect(result).toEqual([{ id: 2, name: 'Campamento' }])
  })

  it('returns empty array when query is empty', async () => {
    expect(await fetchSearchEvents({ query: '', ...apiOptions })).toEqual([])
    expect(await fetchSearchEvents({ query: '   ', ...apiOptions })).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty array when query is missing', async () => {
    expect(await fetchSearchEvents({ ...apiOptions })).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty array when encoding fails', async () => {
    encodeBase64.mockReturnValue(null)
    const result = await fetchSearchEvents({ query: 'Test', ...apiOptions })
    expect(result).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })
})

// ── fetchPublicEventBySlug ────────────────────────────────────────────────

describe('fetchPublicEventBySlug', () => {
  it('fetches a single event by slug', async () => {
    mockClient.get.mockResolvedValue({ data: { id: 3, name: 'My Event' } })

    const result = await fetchPublicEventBySlug({ slugName: 'my-event', ...apiOptions })

    expect(mockClient.get).toHaveBeenCalledWith('/church-event/public', {
      params: { org_id: 'ZW5jb2RlZA==', slug_name: 'my-event' },
    })
    expect(result).toEqual({ id: 3, name: 'My Event' })
  })

  it('returns null when slugName is empty', async () => {
    expect(await fetchPublicEventBySlug({ slugName: '', ...apiOptions })).toBeNull()
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns null when encoding fails', async () => {
    encodeBase64.mockReturnValue(null)
    const result = await fetchPublicEventBySlug({ slugName: 'my-event', ...apiOptions })
    expect(result).toBeNull()
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns null on API error', async () => {
    mockClient.get.mockRejectedValue(new Error('Not found'))
    const result = await fetchPublicEventBySlug({ slugName: 'missing-event', ...apiOptions })
    expect(result).toBeNull()
  })
})

// ── fetchCarouselEvents ───────────────────────────────────────────────────

describe('fetchCarouselEvents', () => {
  it('fetches and groups carousel events', async () => {
    mockClient.get.mockResolvedValue({ data: [{ id: 1, name: 'Event A' }] })

    const result = await fetchCarouselEvents({ nextDays: 30, ...apiOptions })

    expect(mockClient.get).toHaveBeenCalledWith('/church-event/public/carousel', {
      params: { org_id: 'ZW5jb2RlZA==', nextDays: 30 },
    })
    expect(result).toEqual([{ id: 1, name: 'Event A' }])
  })

  it('returns empty array when encoding fails', async () => {
    encodeBase64.mockReturnValue(null)
    const result = await fetchCarouselEvents({ nextDays: 30, ...apiOptions })
    expect(result).toEqual([])
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty array on API error', async () => {
    mockClient.get.mockRejectedValue(new Error('Server error'))
    const result = await fetchCarouselEvents({ nextDays: 30, ...apiOptions })
    expect(result).toEqual([])
  })
})
