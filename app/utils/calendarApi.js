import axios from 'axios'
import { WEEK_STARTS_ON_MONDAY } from '~/constants/dates'
import { encodeBase64 } from '~/utils/base64'
import { normalizeEventDates } from '~/utils/eventDates'

// ── Helpers ───────────────────────────────────────────────────────────────

// Converts JS getDay() (0=Sun … 6=Sat) to a 0-based grid column index
const toWeekColumn = (jsDay) => WEEK_STARTS_ON_MONDAY ? (jsDay + 6) % 7 : jsDay

// Formats a Date object to YYYY-MM-DD in local time
const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Safely unwraps API response structures and normalizes elements
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
const buildDateRange = (calYear, calMonth) => {
  // First day of the target month
  const firstDay = new Date(calYear, calMonth, 1)
  const firstCol = toWeekColumn(firstDay.getDay())
  // JS handles negative days flawlessly: 1 minus the offset gets the exact required date
  const startObj = new Date(calYear, calMonth, 1 - firstCol)

  // Last day of the target month
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const lastCol = toWeekColumn(new Date(calYear, calMonth, daysInMonth).getDay())
  const trailing = lastCol < 6 ? 6 - lastCol : 0
  const endObj = new Date(calYear, calMonth, daysInMonth + trailing)

  return {
    start_date: formatDate(startObj),
    end_date: formatDate(endObj)
  }
}

// ── API Actions ───────────────────────────────────────────────────────────

const createClient = (apiUrl) => axios.create({ baseURL: apiUrl.replace(/\/$/, '') })

export const fetchPublicEvents = async ({ calYear, calMonth, orgId, apiUrl }) => {
  const encoded = encodeBase64(orgId)
  if (!encoded) return []

  const { start_date, end_date } = buildDateRange(calYear, calMonth)

  try {
    const res = await createClient(apiUrl).get('/church-event/public', {
      params: { org_id: encoded, start_date, end_date }
    })
    return handleApiResponse(res)
  } catch {
    return []
  }
}

export const fetchSearchEvents = async ({ query, orgId, apiUrl }) => {
  const trimmed = query?.trim()
  if (!trimmed) return []

  const encoded = encodeBase64(orgId)
  if (!encoded) return []

  try {
    const res = await createClient(apiUrl).get('/church-event/public', {
      params: { org_id: encoded, search: trimmed }
    })
    return handleApiResponse(res)
  } catch {
    return []
  }
}

export const fetchPublicEventBySlug = async ({ slugName, orgId, apiUrl }) => {
  const encoded = encodeBase64(orgId)
  if (!encoded || !slugName) return null

  try {
    const res = await createClient(apiUrl).get('/church-event/public', {
      params: { org_id: encoded, slug_name: slugName }
    })
    return handleApiResponse(res, true)
  } catch {
    return null
  }
}