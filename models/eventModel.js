import { db } from '../config/db.js'

export function findByHash(hash) {
  return db.data.events.find(e => e.hash === hash)
}

export async function createEvent(event) {
  db.data.events.push(event)
  await db.write()
}

export function getAllEvents() {
  return db.data.events
}
