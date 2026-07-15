import { describe, it, expect } from 'vitest'
import { encodeBase64 } from '../base64'

describe('encodeBase64', () => {
  it('encodes a plain string', () => {
    expect(encodeBase64('hello')).toBe('aGVsbG8=')
  })

  it('encodes a string with Unicode characters', () => {
    const encoded = encodeBase64('réunion général')
    expect(encoded).toBeTruthy()
    expect(typeof encoded).toBe('string')
    // Verify it decodes back correctly
    const decoded = decodeURIComponent(escape(atob(encoded)))
    expect(decoded).toBe('réunion général')
  })

  it('encodes a numeric string', () => {
    expect(encodeBase64('42')).toBe('NDI=')
  })

  it('returns null for empty string', () => {
    expect(encodeBase64('')).toBeNull()
  })

  it('returns null for null input', () => {
    expect(encodeBase64(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(encodeBase64(undefined)).toBeNull()
  })

  it('produces valid base64 that can be decoded', () => {
    const original = 'https://example.com/api?org=123&foo=bar'
    const encoded = encodeBase64(original)
    const decoded = decodeURIComponent(escape(atob(encoded)))
    expect(decoded).toBe(original)
  })
})
