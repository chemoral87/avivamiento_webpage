import { getClient } from '~/utils/httpClient'
import { WEEK_STARTS_ON_MONDAY } from '~/constants/dates'
import { encodeBase64 } from '~/utils/base64'
import { normalizeEventDates, groupEventsByName, excludeEventsByNameKeyword } from '~/utils/eventDates'

// ── Helpers ───────────────────────────────────────────────────────────────



/**
 * Encodes an organization ID and returns a params object.
 * Returns null if encoding fails, so callers can short-circuit.
 *
 * @param {string|number} orgId - Raw organization ID
 * @param {string} apiUrl - API base URL
 * @returns {{ client: import('axios').AxiosInstance | null, encoded: string | null }}
 */
const prepareRequest = (orgId, apiUrl) => ({
  client: getClient(apiUrl),
  encoded: encodeBase64(orgId),
})

// Converts JS getDay() (0=Sun … 6=Sat) to a 0-based grid column index
const toWeekColumn = (jsDay) => (WEEK_STARTS_ON_MONDAY ? (jsDay + 6) % 7 : jsDay)

// Formats a Date object to YYYY-MM-DD in local time
const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Safely unwraps API response structures and normalizes elements.
 *
 * @param {import('axios').AxiosResponse} response - Axios response object
 * @param {boolean} [expectSingle=false] - Whether to return a single item or array
 * @returns {object | object[] | null}
 */
const handleApiResponse = (response, expectSingle = false) => {
  if (!response?.data) return expectSingle ? null : []

  const rawData = Array.isArray(response.data) ? response.data : (response.data.data ?? response.data)

  if (expectSingle) {
    const singleItem = Array.isArray(rawData) ? rawData[0] : rawData
    return singleItem ? normalizeEventDates(singleItem) : null
  }

  return Array.isArray(rawData) ? rawData.map(normalizeEventDates) : []
}

// ── Build visible date range for the current calendar month ───────────────

/**
 * Calculates the start and end dates for a calendar month grid, including
 * leading/trailing days from adjacent months to fill full weeks.
 *
 * @param {number} calYear - Calendar year
 * @param {number} calMonth - Calendar month (0 = January … 11 = December)
 * @returns {{ start_date: string, end_date: string }} YYYY-MM-DD dates
 */
const buildDateRange = (calYear, calMonth) => {
  // First day of the target month
  const firstDay = new Date(calYear, calMonth, 1)
  const firstCol = toWeekColumn(firstDay.getDay())

  // JS handles negative days flawlessly: 1 minus the offset gets the exact required date
  const startObj = new Date(calYear, calMonth, 1 - firstCol)

  // Last day of the target month
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const lastCol = toWeekColumn(new Date(calYear, calMonth, daysInMonth).getDay())
  const trailing = (lastCol < 6) ? (6 - lastCol) : 0
  const endObj = new Date(calYear, calMonth, daysInMonth + trailing)

  return {
    start_date: formatDate(startObj),
    end_date: formatDate(endObj),
  }
}

// ── API Actions ───────────────────────────────────────────────────────────

/**
 * Fetches public events for a given calendar month view.
 *
 * @param {object}         options
 * @param {number}         options.calYear  - Year
 * @param {number}         options.calMonth - Month (0-indexed)
 * @param {string|number}  options.orgId    - Organization ID
 * @param {string}         options.apiUrl   - API base URL
 * @returns {Promise<object[]>} Normalized events array
 */
export const fetchPublicEvents = async ({ calYear, calMonth, orgId, apiUrl }) => {
  const { client, encoded } = prepareRequest(orgId, apiUrl)
  if (!encoded || !client) return []

  const { start_date, end_date } = buildDateRange(calYear, calMonth)

  try {
    const res = await client.get('/church-event/public', {
      params: { org_id: encoded, start_date, end_date },
    })
    return handleApiResponse(res)
  } catch {
    return []
  }
}

/**
 * Searches public events by name keyword.
 *
 * @param {object}         options
 * @param {string}         options.query   - Search keyword
 * @param {string|number}  options.orgId   - Organization ID
 * @param {string}         options.apiUrl  - API base URL
 * @returns {Promise<object[]>} Normalized events array
 */
export const fetchSearchEvents = async ({ query, orgId, apiUrl }) => {
  const trimmed = query?.trim()
  if (!trimmed) return []

  const { client, encoded } = prepareRequest(orgId, apiUrl)
  if (!encoded || !client) return []

  try {
    const res = await client.get('/church-event/public', {
      params: { org_id: encoded, search: trimmed },
    })
    return handleApiResponse(res)
  } catch {
    return []
  }
}

/**
 * Fetches a single public event by its slug name.
 *
 * @param {object}         options
 * @param {string}         options.slugName - Event slug
 * @param {string|number}  options.orgId    - Organization ID
 * @param {string}         options.apiUrl   - API base URL
 * @returns {Promise<object|null>} Normalized event or null
 */
export const fetchPublicEventBySlug = async ({ slugName, orgId, apiUrl }) => {
  if (!slugName) return null

  const { client, encoded } = prepareRequest(orgId, apiUrl)
  if (!encoded || !client) return null

  try {
    const res = await client.get('/church-event/public', {
      params: { org_id: encoded, slug_name: slugName },
    })
    return handleApiResponse(res, true)
  } catch {
    return null
  }
}

/**
 * Fetches upcoming events for the carousel view, grouped by name and
 * with "General" events excluded.
 *
 * @param {object}         options
 * @param {number}         options.nextDays - How many days ahead to look
 * @param {string|number}  options.orgId    - Organization ID
 * @param {string}         options.apiUrl   - API base URL
 * @returns {Promise<object[]>} Grouped events array
 */
export const fetchCarouselEvents = async ({ nextDays, orgId, apiUrl }) => {
  const { client, encoded } = prepareRequest(orgId, apiUrl)
  if (!encoded || !client) return []

  try {
    const res = await client.get('/church-event/public/carousel', {
      params: { org_id: encoded, nextDays },
    })
    const events = excludeEventsByNameKeyword(handleApiResponse(res), 'General')
    return groupEventsByName(events)
  } catch {
    return []
  }
}
