export const classifications = [
  { value: 'general',     label: 'General',     hex: '#9e9e9e' },
  { value: 'jv3s',        label: 'JV3S',        hex: '#f97316' },
  { value: 'jv3s-teen',   label: 'JV3S Teen',   hex: '#2196f3' },
  { value: 'jv3s-legado', label: 'JV3S Legado', hex: '#f44336' },
]

export const classificationColor = (value) => {
  const match = classifications.find(item => item.value === value)
  return match ? match.hex : '#041845'
}
