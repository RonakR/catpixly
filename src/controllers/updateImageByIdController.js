import createError from 'http-errors'

import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'updateImageByIdController' })

export default async function updateImageById(req, res, next) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			return next(createError(400, 'No image id provided'))
		}
		if (!req.file) {
			log.error('No image provided when making a call to add image')
			return next(createError(400, 'No image provided.'))
		}

		const isImageUpdated = await ImageService.updateImageById(req.params.id, req.file)
		res.send(
			isImageUpdated ? 'Image updated successfully' : `Image not updated, no image with id ${req.params.id} found `
		)
	} catch (e) {
		next(e)
	}
}
