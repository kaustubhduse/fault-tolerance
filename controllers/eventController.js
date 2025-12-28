import { db } from '../config/db.js'

export function getProcessed(_, res) {
  res.json({ ok: true, events: db.data.events })
}

export function getFailed(_, res) {
  res.json({ ok: true, failed: db.data.failedEvents })
}
