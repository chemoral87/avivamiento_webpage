import axios from 'axios'
import { encodeBase64 } from '~/utils/base64'

export const fetchPublicTestimonies = async ({ page = 1, perPage = 25, orgId, apiUrl } = {}) => {
  const encoded = encodeBase64(orgId)
  if (!encoded) return { pagination: {}, testimonies: [], page: page || 1 }

  const base = (apiUrl || '').replace(/\/$/, '')
  if (!base) return { pagination: {}, testimonies: [], page: page || 1 }

  const url = `${base}/testimony/public?org_id=${encodeURIComponent(encoded)}&itemsPerPage=${perPage}&page=${page}`

  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data) {
      return {
        pagination: res.data,
        testimonies: res.data.data ?? [],
        page: res.data.current_page ?? page,
      }
    }
  } catch (err) {

  }

  return { pagination: {}, testimonies: [], page: page || 1 }
}
