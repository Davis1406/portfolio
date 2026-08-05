export const githubConfig = {
  username: 'Davis1406',
  cacheMinutes: 10,
  maxPages: 3,
}

export async function fetchPublicContributions(username) {
  const cacheKey = `gh:contrib:${username}`
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.fetchedAt < githubConfig.cacheMinutes * 60 * 1000) {
        return parsed
      }
    }
  } catch {
    /* cache unavailable */
  }

  const counts = {}
  for (let page = 1; page <= githubConfig.maxPages; page++) {
    const url = `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
    const events = await res.json()
    if (!Array.isArray(events) || events.length === 0) break

    let progressed = false
    for (const event of events) {
      if (event.type !== 'PushEvent' || !event.created_at) continue
      const payload = event.payload || {}
      let commits = 1
      if (Array.isArray(payload.commits) && payload.commits.length > 0) {
        commits = payload.commits.length
      } else if (payload.size) {
        commits = payload.size
      }
      const day = event.created_at.slice(0, 10)
      counts[day] = (counts[day] || 0) + commits
      progressed = true
    }
    if (!progressed) break
  }

  const result = { counts, fetchedAt: Date.now() }
  try {
    localStorage.setItem(cacheKey, JSON.stringify(result))
  } catch {
    /* storage unavailable */
  }
  return result
}
