/**
 * Encodes a string to base64 with Unicode support.
 *
 * Falls back to Node.js Buffer approach if the native `btoa` + `unescape`
 * combination fails (e.g., in edge rendering environments).
 *
 * @param {string} str - String to encode
 * @returns {string|null} Base64-encoded string, or null if input is empty/falsy
 */
export const encodeBase64 = (str) => {
  if (!str) return null
  try {
    return btoa(unescape(encodeURIComponent(str)))
  } catch (e) {
    try {
      return Buffer.from(str, 'utf-8').toString('base64')
    } catch {
      return null
    }
  }
}
