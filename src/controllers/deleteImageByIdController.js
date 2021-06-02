import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'deleteImageByIdController' })

export default async function deleteImageById(req, res) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to delete image')
			res.status(400).send('No image id provided')
		}

		await ImageService.deleteImageById(req.params.id)
		res.sendStatus(204)
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
