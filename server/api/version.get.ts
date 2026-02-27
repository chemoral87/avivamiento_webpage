import { execSync } from 'child_process'

export default defineEventHandler(() => {
  try {
    const commit = execSync('git rev-parse HEAD', { cwd: process.cwd() }).toString().trim()
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: process.cwd() }).toString().trim()
    const date = execSync('git log -1 --format=%cd --date=iso', { cwd: process.cwd() }).toString().trim()
    const message = execSync('git log -1 --format=%s', { cwd: process.cwd() }).toString().trim()

    return {
      commit,
      branch,
      date,
      message
    }
  } catch {
    return { error: 'Unable to read version info' }
  }
})
