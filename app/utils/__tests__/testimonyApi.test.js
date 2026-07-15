import { describe, it, expect, beforeEach, vi } from 'vitest'

// ── Mock dependencies ─────────────────────────────────────────────────────

vi.mock('../httpClient', () => ({
  getClient: vi.fn(),
}))

vi.mock('../base64', () => ({
  encodeBase64: vi.fn(),
}))

import { getClient } from '../httpClient'
import { encodeBase64 } from '../base64'
import { fetchPublicTestimonies } from '../testimonyApi'

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

// ── fetchPublicTestimonies ────────────────────────────────────────────────

describe('fetchPublicTestimonies', () => {
  it('fetches paginated testimonies with default params', async () => {
    mockClient.get.mockResolvedValue({
      status: 200,
      data: {
        current_page: 1,
        data: [{ id: 1, title: 'Testimony 1' }, { id: 2, title: 'Testimony 2' }],
      },
    })

    const result = await fetchPublicTestimonies(apiOptions)

    expect(encodeBase64).toHaveBeenCalledWith(4)
    expect(getClient).toHaveBeenCalledWith('https://api.example.com')
    expect(mockClient.get).toHaveBeenCalledWith('/testimony/public', {
      params: { org_id: 'ZW5jb2RlZA==', itemsPerPage: 25, page: 1 },
    })
    expect(result).toEqual({
      pagination: {
        current_page: 1,
        data: [{ id: 1, title: 'Testimony 1' }, { id: 2, title: 'Testimony 2' }],
      },
      testimonies: [{ id: 1, title: 'Testimony 1' }, { id: 2, title: 'Testimony 2' }],
      page: 1,
    })
  })

  it('fetches a specific page with custom perPage', async () => {
    mockClient.get.mockResolvedValue({
      status: 200,
      data: { current_page: 3, data: [{ id: 5 }], last_page: 5 },
    })

    const result = await fetchPublicTestimonies({ page: 3, perPage: 10, ...apiOptions })

    expect(mockClient.get).toHaveBeenCalledWith('/testimony/public', {
      params: { org_id: 'ZW5jb2RlZA==', itemsPerPage: 10, page: 3 },
    })
    expect(result.page).toBe(3)
    expect(result.testimonies).toEqual([{ id: 5 }])
  })

  it('returns empty result when org_id encoding fails', async () => {
    encodeBase64.mockReturnValue(null)
    const result = await fetchPublicTestimonies(apiOptions)
    expect(result).toEqual({ pagination: {}, testimonies: [], page: 1 })
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('returns empty result when getClient returns null', async () => {
    getClient.mockReturnValue(null)
    const result = await fetchPublicTestimonies(apiOptions)
    expect(result).toEqual({ pagination: {}, testimonies: [], page: 1 })
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it('handles non-200 response gracefully', async () => {
    mockClient.get.mockResolvedValue({ status: 404, data: null })
    const result = await fetchPublicTestimonies(apiOptions)
    expect(result).toEqual({ pagination: {}, testimonies: [], page: 1 })
  })

  it('handles API error gracefully', async () => {
    mockClient.get.mockRejectedValue(new Error('Server error'))
    const result = await fetchPublicTestimonies(apiOptions)
    expect(result).toEqual({ pagination: {}, testimonies: [], page: 1 })
  })

  it('falls back to provided page number when response is missing current_page', async () => {
    mockClient.get.mockResolvedValue({
      status: 200,
      data: { data: [{ id: 1 }] },  // no current_page
    })
    const result = await fetchPublicTestimonies({ page: 5, ...apiOptions })
    expect(result.page).toBe(5)
  })

  it('handles response with no options (defaults)', async () => {
    encodeBase64.mockReturnValue(null) // will short-circuit
    const result = await fetchPublicTestimonies()
    expect(result).toEqual({ pagination: {}, testimonies: [], page: 1 })
  })
})
