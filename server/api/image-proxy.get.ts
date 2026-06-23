export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const imageUrl = query.url as string

  if (!imageUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Missing url parameter' })
  }

  const allowedPatterns = ['.s3.', 'amazonaws.com', 's3.']
  const isAllowed = allowedPatterns.some(p => imageUrl.includes(p))
  if (!isAllowed) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid image source' })
  }

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw createError({ statusCode: 502, statusMessage: `Origin responded ${response.status}` })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    setResponseHeader(event, 'Content-Type', contentType)
    setResponseHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400, immutable')
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*')

    return Buffer.from(buffer)
  } catch (e) {
    throw createError({ statusCode: 502, statusMessage: 'Image proxy failed' })
  }
})
