import { ingestEvent } from '../services/ingestService.js'
import { db } from '../config/db.js'

export async function ingest(req, res) {
  try {
    const simulate = req.header('X-SIMULATE-FAIL') === '1'
    const result = await ingestEvent(req.body, simulate)
    res.json({ ok: true, ...result })
  } catch (err) {
    db.data.failedEvents.push({
      id: Date.now(),
      raw: req.body,
      reason: err.message,
      received_at: new Date().toISOString()
    })
    await db.write()
    res.status(500).json({ ok: false, reason: err.message })
  }
}
