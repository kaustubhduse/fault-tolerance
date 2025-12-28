import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import fs from 'fs'

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
const dbPath = isProduction ? '/tmp/db.json' : 'db.json'
const file = path.resolve(dbPath)

if (isProduction) {
  try {
    fs.mkdirSync('/tmp', { recursive: true })
  } catch (err) {
  }
}

const adapter = new JSONFile(file)

const defaultData = {
  events: [],
  failedEvents: []
}

export const db = new Low(adapter, defaultData)

await db.read()
await db.write()
