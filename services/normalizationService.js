export function normalize(raw) {
  const payload = raw.payload || {}

  return {
    client_id: raw.source || 'unknown_client',
    metric: payload.metric || 'unknown_metric',
    amount: Number(payload.amount || payload.value || 0),
    timestamp: payload.timestamp
      ? new Date(payload.timestamp.replace(/\//g, '-')).toISOString()
      : new Date().toISOString(),
    raw
  }
}
