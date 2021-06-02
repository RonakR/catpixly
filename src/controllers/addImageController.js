import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'addImageController' })

export default async function addImage(req, res, next) {
	try {
		if (!req.file) {
			log.error('No filename provided when making a call to add image')
			res.status(400).send('No filename provided')
		}

		const image = await ImageService.addImageToDb(req.file)
		res.send(image)
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
