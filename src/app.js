import 'dotenv/config'
import express from 'express'

import logger from './logger.js'

const log = logger.child({ label: 'app' })

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
	res.send('Hello World')
})

app.listen(3000, () => {
	log.info('Server listening on port 3000')
})
