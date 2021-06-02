import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'getImageByIdController' })

export default async function getImageById(req, res) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			res.status(400).send('No image id provided')
		}

		const image = await ImageService.getImageById(req.params.id)
		image ? res.send(image) : res.send('Image requested does not exist')
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
