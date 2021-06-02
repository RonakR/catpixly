import 'dotenv/config'
import express from 'express'

import imageRoutes from './routes/image.js'
import { createDbConnection } from './dbConnection.js'
import logger from './logger.js'

const log = logger.child({ label: 'app' })

const app = express()
createDbConnection()

app.use(express.json())

app.use('/images', imageRoutes)

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.use((req, res) => {
	res.sendStatus(404)
})

app.listen(3000, () => {
	log.info('Server listening on port 3000')
})
