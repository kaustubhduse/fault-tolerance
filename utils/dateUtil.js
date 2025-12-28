export function parseDate(value) {
  if (!value) {
    return new Date().toISOString()
  }

  try {
    const normalized = String(value).trim().replace(/[/.]/g, '-')
    const date = new Date(normalized)

    if (isNaN(date.getTime())) {
      return new Date().toISOString()
    }

    return date.toISOString()
  } catch {
    return new Date().toISOString()
  }
}
