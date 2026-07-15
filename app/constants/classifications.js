/**
 * Classification definitions for church events.
 * @type {Array<{ value: string, label: string, hex: string }>}
 */
export const classifications = [
  { value: 'general',     label: 'General',      hex: '#9e9e9e' },
  { value: 'kids',        label: 'Kids',         hex: '#4CAF50' },
  { value: 'jv3s',        label: 'JV3S',         hex: '#f97316' },
  { value: 'jv3s-teen',   label: 'JV3S Origen',  hex: '#2196f3' },
  { value: 'jv3s-impulso', label: 'JV3S Impulso', hex: '#195defff' },
  { value: 'jv3s-legado',  label: 'JV3S Legado',  hex: '#f44336' },
]

// Build O(1) lookup map once at module load time
const colorMap = new Map(classifications.map(c => [c.value, c.hex]))

/**
 * Returns the hex color for a given classification value.
 * Falls back to the default brand color (#041845).
 *
 * @param {string} value - Classification value (e.g. 'general', 'kids')
 * @returns {string} Hex color string
 */
export const classificationColor = (value) => colorMap.get(value) ?? '#041845'
