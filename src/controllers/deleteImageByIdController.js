import createError from 'http-errors'

import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'deleteImageByIdController' })

export default async function deleteImageById(req, res, next) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to delete image')
			return next(createError(400, 'No image id provided'))
		}

		await ImageService.deleteImageById(req.params.id)
		res.sendStatus(204)
	} catch (e) {
		next(e)
	}
}
