import { db } from '../config/db.js'

export async function saveFailedEvent(failed) {
  db.data.failedEvents.push(failed)
  await db.write()
}

export function getFailedEvents() {
  return db.data.failedEvents
}
