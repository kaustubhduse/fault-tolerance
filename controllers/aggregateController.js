import { db } from '../config/db.js'

export function getAggregates(_, res) {
  const result = {}

  for (const e of db.data.events) {
    const key = `${e.client_id}:${e.metric}`
    if (!result[key]) {
      result[key] = {
        client_id: e.client_id,
        metric: e.metric,
        count: 0,
        total: 0
      }
    }
    result[key].count++
    result[key].total += e.amount
  }

  res.json({ ok: true, aggregates: Object.values(result) })
}
