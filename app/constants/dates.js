export const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

// ── Week start flag ────────────────────────────────────────────────────────
// Set to true  → week starts on Monday (Lun, Mar, Mié, Jue, Vie, Sáb, Dom)
// Set to false → week starts on Sunday (Dom, Lun, Mar, Mié, Jue, Vie, Sáb)
export const WEEK_STARTS_ON_MONDAY = true

export const weekdayNamesMondayFirst = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
export const weekdayNamesSundayFirst = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

// Kept for backward-compatibility — resolves to whichever the flag selects
export const weekdayNames = WEEK_STARTS_ON_MONDAY
  ? weekdayNamesMondayFirst
  : weekdayNamesSundayFirst

export const formatEventTime = (t) => {
  if (!t) return ''
  const match = String(t).match(/^(\d{1,2}):(\d{2})/)
  if (!match) return t
  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const period = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours}:${minutes} ${period}`
}

export const formatEventDate = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const [year, month, day] = String(d).slice(0, 10).split('-').map(Number)
    return `${day} de ${monthNames[month - 1]} ${year}`
  } catch { return d }
}

// Full weekday names, Sunday-indexed (matches JS Date#getDay())
const weekdayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// Short display used in the carousel: "Lunes 22 Julio" — no year
export const formatEventDateShort = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const [year, month, day] = String(d).slice(0, 10).split('-').map(Number)
    const weekday = weekdayNamesFull[new Date(year, month - 1, day).getDay()]
    return `${weekday} ${day} ${monthNames[month - 1]}`
  } catch { return d }
}

// Formats one or more event dates for the carousel. Multiple distinct dates
// are shown as a range joined by an em dash, e.g. "Lunes 22 Julio — Martes 23 Julio"
export const formatEventDateRangeShort = (dates) => {
  const valid = (Array.isArray(dates) ? dates : [dates]).filter(Boolean)
  if (valid.length === 0) return 'Fecha por confirmar'

  const sorted = [...new Set(valid)].sort()
  const first = sorted[0]
  const last = sorted[sorted.length - 1]

  if (first === last) return formatEventDateShort(first)
  return `${formatEventDateShort(first)} — ${formatEventDateShort(last)}`
}
