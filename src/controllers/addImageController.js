import ImageService from '../services/imageService.js'
import logger from '../logger.js'

const log = logger.child({ label: 'addImageController' })

export default async function addImage(req, res) {
	try {
		if (!req.body.filename) {
			log.error('No filename provided when making a call to add image')
			res.status(400).send('No filename provided')
		}

		const image = await ImageService.addImageToDb(req.body.filename)
		res.send(image)
	} catch (e) {
		next(e)
	}
}
