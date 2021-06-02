import createError from 'http-errors'

import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'getImageByIdController' })

export default async function getImageById(req, res, next) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			return next(createError(400, 'No image id provided'))
		}

		const image = await ImageService.getImageById(req.params.id)
		image ? res.send(image) : res.send('Image requested does not exist')
	} catch (e) {
		next(e)
	}
}
