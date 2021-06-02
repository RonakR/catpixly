import mongoose from 'mongoose'
import GridFsStorage from 'multer-gridfs-storage'

import config from './config.js'
import logger from './logger.js'

const { mongoDbUrl } = config
const log = logger.child({ label: 'dbConnection' })

/**
 * * Initialize connection to MongoDB
 */
export function createDbConnection() {
	try {
		// Connect to MongoDb
		// * The two options passed into mongoose connection help with MongoDb driver deprecation notices
		// * useNewUrlParser - enables the new connection string parser from MongoDB
		// * useUnifiedTopology - enables the use of new Server Discovery and Monitoring engine in MongoDb
		mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
		const dbConnection = mongoose.connection

		dbConnection.once('open', () => {
			log.info('Db Connected')
		})
		dbConnection.on('errors', (e) => {
			log.error('ERROR: Unable to execute queries on db')
			log.error(e)
		})
	} catch (e) {
		log.error('ERROR: Unable to connect to db')
		log.error(e)
	}
}

/**
 * * Set up GridFS storage engine for storing images to MongoDB
 */
export function createGridFsStorage() {
	const storage = new GridFsStorage({
		url: config.mongoDbUrl,
		options: { useUnifiedTopology: true },
		file: async (req, file) => {
			const splitFileName = file.originalname.split('.')
			const ext = splitFileName.pop()
			const newFileName = splitFileName.join('.')
			const fileInfo = {
				filename: `${newFileName}_${Date.now()}.${ext}`,
				bucketName: 'uploads',
			}
			return fileInfo
		},
	})
	return storage
}
