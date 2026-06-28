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
