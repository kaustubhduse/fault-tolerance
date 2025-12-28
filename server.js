import express from 'express'
import cors from 'cors'

import ingestRoutes from './routes/ingestRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import aggregateRoutes from './routes/aggregateRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/ingest', ingestRoutes)
app.use('/events', eventRoutes)
app.use('/aggregates', aggregateRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
