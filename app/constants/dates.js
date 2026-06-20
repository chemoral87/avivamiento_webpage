export const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

export const weekdayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

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
