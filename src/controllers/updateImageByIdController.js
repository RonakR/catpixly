import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'updateImageByIdController' })

export default async function updateImageById(req, res) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			res.status(400).send('No image id provided')
		}
		if (!req.file) {
			log.error('No image provided when making a call to add image')
			res.status(400).send('No image provided')
		}

		await ImageService.updateImageById(req.params.id, req.file)
		res.send('Image updated successfully')
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
