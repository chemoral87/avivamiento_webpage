import { getClient } from '~/utils/httpClient'
import { encodeBase64 } from '~/utils/base64'

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Safely unwraps a paginated API response.
 *
 * @param {import('axios').AxiosResponse} response - Axios response object
 * @param {number} [page=1] - Fallback page number
 * @returns {{ pagination: object, testimonies: object[], page: number }}
 */
const handleResponse = (response, page = 1) => {
  if (response?.status === 200 && response.data) {
    return {
      pagination: response.data,
      testimonies: response.data.data ?? [],
      page: response.data.current_page ?? page,
    }
  }
  return { pagination: {}, testimonies: [], page }
}

/**
 * Fetches a paginated list of public testimonies.
 *
 * @param {object} [options]
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.perPage=25] - Items per page
 * @param {string|number} options.orgId - Organization ID (will be base64-encoded)
 * @param {string} options.apiUrl - API base URL
 * @returns {Promise<{ pagination: object, testimonies: object[], page: number }>}
 */
export const fetchPublicTestimonies = async ({ page = 1, perPage = 25, orgId, apiUrl } = {}) => {
  const encoded = encodeBase64(orgId)
  const client = getClient(apiUrl)
  if (!encoded || !client) return { pagination: {}, testimonies: [], page }

  try {
    const res = await client.get('/testimony/public', {
      params: { org_id: encoded, itemsPerPage: perPage, page },
    })
    return handleResponse(res, page)
  } catch (err) {
    console.error('Error fetching testimonies:', err)
    return { pagination: {}, testimonies: [], page }
  }
}
