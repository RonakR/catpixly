import createError from 'http-errors'

import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'addImageController' })

export default async function addImage(req, res, next) {
	try {
		if (!req.file) {
			log.error('No image provided when making a call to add image')
			return next(createError(400, 'No image provided.'))
		}

		const image = await ImageService.addImageToDb(req.file)
		res.send(image)
	} catch (e) {
		next(e)
	}
}
