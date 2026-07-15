import { describe, it, expect, beforeEach, vi } from 'vitest'

const { mockCreateFn } = vi.hoisted(() => ({
  mockCreateFn: vi.fn(() => ({ get: vi.fn() })),
}))

vi.mock('axios', () => ({
  default: { create: mockCreateFn },
  create: mockCreateFn,
}))

describe('getClient', () => {
  /** @type {import('../httpClient').getClient} */
  let getClient

  beforeEach(async () => {
    vi.clearAllMocks()
    // Reset module registry so the next import gives us a fresh clientCache Map
    vi.resetModules()
    const mod = await import('../httpClient')
    getClient = mod.getClient
  })

  it('returns null for empty apiUrl', () => {
    expect(getClient('')).toBeNull()
    expect(getClient(null)).toBeNull()
    expect(getClient(undefined)).toBeNull()
  })

  it('creates an axios client for a valid URL', () => {
    getClient('https://api.example.com')
    expect(mockCreateFn).toHaveBeenCalledWith({ baseURL: 'https://api.example.com' })
  })

  it('strips trailing slash from the URL', () => {
    getClient('https://api.example.com/')
    expect(mockCreateFn).toHaveBeenCalledWith({ baseURL: 'https://api.example.com' })
  })

  it('returns the same (cached) instance for the same base URL', () => {
    const client1 = getClient('https://api.example.com')
    const client2 = getClient('https://api.example.com')
    const client3 = getClient('https://api.example.com/')

    expect(client1).toBe(client2)
    expect(client1).toBe(client3)
    expect(mockCreateFn).toHaveBeenCalledTimes(1)
  })

  it('creates different instances for different URLs', () => {
    const client1 = getClient('https://api1.example.com')
    const client2 = getClient('https://api2.example.com')

    expect(client1).not.toBe(client2)
    expect(mockCreateFn).toHaveBeenCalledTimes(2)
  })

  it('returned client has a get method', () => {
    const client = getClient('https://api.example.com')
    expect(typeof client.get).toBe('function')
  })
})
