/** @type {string[]} */
export const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// ── Week start flag ────────────────────────────────────────────────────────
// Set to true  → week starts on Monday (Lun, Mar, Mié, Jue, Vie, Sáb, Dom)
// Set to false → week starts on Sunday (Dom, Lun, Mar, Mié, Jue, Vie, Sáb)
export const WEEK_STARTS_ON_MONDAY = true

export const weekdayNamesMondayFirst = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
export const weekdayNamesSundayFirst = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

/**
 * Day names resolved to whichever week-start the flag selects.
 * @type {string[]}
 */
export const weekdayNames = WEEK_STARTS_ON_MONDAY
  ? weekdayNamesMondayFirst
  : weekdayNamesSundayFirst

// Full weekday names, Sunday-indexed (matches JS Date#getDay())
const weekdayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// ── Internal helpers ──────────────────────────────────────────────────────

/**
 * Splits a YYYY-MM-DD string into its numeric components.
 * Returns null if the input is falsy or malformed.
 * @param {*} d
 * @returns {{ year: number, month: number, day: number } | null}
 */
const parseDateParts = (d) => {
  if (!d) return null
  try {
    const [year, month, day] = String(d).slice(0, 10).split('-').map(Number)
    if (!year || !month || !day) return null
    return { year, month, day }
  } catch {
    return null
  }
}

// ── Exported formatters ───────────────────────────────────────────────────

/**
 * Formats a 24h time string to 12h format with am/pm.
 * @param {string|number} t - Time string like "20:00" or "09:45"
 * @returns {string} Formatted time like "8:00 pm" or "9:45 am"
 */
export const formatEventTime = (t) => {
  if (!t) return ''
  const match = String(t).match(/^(\d{1,2}):(\d{2})/)
  if (!match) return String(t)
  let hours = +match[1]
  const minutes = match[2]
  const period = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${period}`
}

/**
 * Formats a date string to "D de Mes AAAA" (e.g. "15 de Julio 2026").
 * @param {*} d - Date string in YYYY-MM-DD format
 * @returns {string}
 */
export const formatEventDate = (d) => {
  const parts = parseDateParts(d)
  if (!parts) return 'Fecha por confirmar'
  return `${parts.day} de ${monthNames[parts.month - 1]} ${parts.year}`
}

/**
 * Short display used by the carousel: "Lunes 22 Julio" — no year.
 * @param {*} d - Date string in YYYY-MM-DD format
 * @returns {string}
 */
export const formatEventDateShort = (d) => {
  const parts = parseDateParts(d)
  if (!parts) return 'Fecha por confirmar'
  const weekday = weekdayNamesFull[new Date(parts.year, parts.month - 1, parts.day).getDay()]
  return `${weekday} ${parts.day} ${monthNames[parts.month - 1]}`
}

/**
 * Formats one or more event dates for the carousel. Multiple distinct dates
 * are shown as a range joined by an em dash, e.g. "Lunes 22 Julio — Martes 23 Julio".
 * @param {string|string[]} dates - Single date string or array of date strings
 * @returns {string}
 */
export const formatEventDateRangeShort = (dates) => {
  const valid = (Array.isArray(dates) ? dates : [dates]).filter(Boolean)
  if (valid.length === 0) return 'Fecha por confirmar'

  const sorted = [...new Set(valid)].sort()
  const first = sorted[0]
  const last = sorted[sorted.length - 1]

  if (first === last) return formatEventDateShort(first)
  return `${formatEventDateShort(first)} — ${formatEventDateShort(last)}`
}
