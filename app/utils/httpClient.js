import axios from 'axios'

/**
 * Map of base URLs to their axios clients.
 * Created once and cached for the lifetime of the app.
 * @type {Map<string, import('axios').AxiosInstance>}
 */
const clientCache = new Map()

/**
 * Creates (or reuses) an axios client for the given API base URL.
 *
 * @param {string} apiUrl - Base URL for the API
 * @returns {import('axios').AxiosInstance | null} Axios instance, or null if apiUrl is empty
 */
export const getClient = (apiUrl) => {
  if (!apiUrl) return null
  const base = apiUrl.replace(/\/$/, '')
  if (!clientCache.has(base)) {
    clientCache.set(base, axios.create({ baseURL: base }))
  }
  return clientCache.get(base)
}
