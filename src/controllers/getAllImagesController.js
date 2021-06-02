import createError from 'http-errors'

import ImageService from '../services/imageService.js'

export default async function getAllImages(req, res) {
	try {
		const images = await ImageService.getAllImages()
		res.send(images)
	} catch (e) {
		next(e)
	}
}
