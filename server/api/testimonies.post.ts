import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Grab API_URL from runtime config public only
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL

  // If an external API_URL is configured, proxy the request there.
  let proxiedError: any = null
  if (API_URL) {
    const target = `${API_URL.replace(/\/$/, '')}/testimony`
    try {
      const proxied = await $fetch(target, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      })

      return { success: true, proxied: true, target, data: proxied }
    } catch (e: any) {
      // Capture detailed info for debugging and fall back to local storage
      const status = e?.status ?? e?.response?.status ?? null
      const data = e?.data ?? e?.response?.data ?? null
      const message = e?.message ?? String(e)
      proxiedError = { status, message, data }
      console.error('Proxy to API_URL failed, falling back to local file. Target:', target, proxiedError)
    }
  }

  const dataDir = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDir, 'testimonies.json')

  try {
    await fs.mkdir(dataDir, { recursive: true })

    let existing: any[] = []
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      existing = JSON.parse(content || '[]')
    } catch (e) {
      existing = []
    }

    const id = Date.now()
    const entry = {
      id,
      name: body.name || null,
      phone_number: body.phone_number || null,
      categories: body.categories || null,
      link: body.link || null,
      description: body.description || null,
      created_at: new Date().toISOString()
    }

    existing.push(entry)
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8')

    // If we proxied earlier and it failed, return the proxied error details for debugging
    if (proxiedError) {
      return { success: true, proxied: false, fallback: 'local', proxiedError, data: entry }
    }

    return { success: true, data: entry }
  } catch (err) {
    console.error('Error saving testimony:', err)
    setResponseStatus(event, 500)
    return { success: false, error: 'Error saving testimony' }
  }
})
