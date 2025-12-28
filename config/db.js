import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'

const file = path.resolve('db.json')
const adapter = new JSONFile(file)

// Initialize with default data structure
const defaultData = {
  events: [],
  failedEvents: []
}

export const db = new Low(adapter, defaultData)

await db.read()
await db.write()
