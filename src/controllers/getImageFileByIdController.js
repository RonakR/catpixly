import ImageFileService from '../services/imageFileService.js'
import logger from '../logger.js'
import { gridFsStream } from '../dbConnection.js'

const log = logger.child({ label: 'getImageFileByIdController' })

export default async function getImageFileById(req, res) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			res.status(400).send('No image id provided')
		}

		const image = await ImageFileService.getImageFileById(req.params.id, res)
		image ? gridFsStream.openDownloadStreamByName(image.filename).pipe(res) : res.send('Image requested does not exist')
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
