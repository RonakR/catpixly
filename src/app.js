import createError from 'http-errors'
import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import imageRoutes from './routes/image.js'
import { createDbConnection } from './dbConnection.js'
import logger from './logger.js'

const log = logger.child({ label: 'app' })

const app = express()
createDbConnection()

app.use(express.json())

app.use('/images', imageRoutes)

app.get('/', (req, res) => {
	// ES6 modules do not have __dirname or __filename defined
	const __dirname = path.dirname(fileURLToPath(import.meta.url))
	res.sendFile(path.resolve(__dirname + '/index.html'))
})

app.use((req, res, next) => {
	next(createError(404, 'Check your request'))
})

app.use((err, req, res, next) => {
	let status
	let message
	switch (err.status) {
		case 400:
			status = 400
			message = `Validation Error: ${err.message}`
			break
		default:
			status = 500
			message = `Internal Server Error: ${err.message}`
	}
	log.error('Image Api service encountered an error ->', { message })
	res.status(status).send(message)
})

app.listen(3000, () => {
	log.info('Server listening on port 3000')
})
