import { db } from '../config/db.js'
import { normalize } from './normalizationService.js'
import { generateHash } from '../utils/hashUtil.js'
import { nanoid } from 'nanoid'

export async function ingestEvent(raw, simulateFailure) {
  const normalized = normalize(raw)

  const hash = generateHash({
    client_id: normalized.client_id,
    metric: normalized.metric,
    amount: normalized.amount,
    timestamp: normalized.timestamp
  })

  const exists = db.data.events.find(e => e.hash === hash)
  if (exists) return { deduped: true }

  if (simulateFailure) {
    throw new Error('Simulated DB failure')
  }

  db.data.events.push({
    id: nanoid(),
    ...normalized,
    hash,
    status: 'processed',
    received_at: new Date().toISOString()
  })

  await db.write()
  return { deduped: false }
}
