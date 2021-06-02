import ImageModel from '../models/imageModel.js'
import logger from '../logger.js'
import { gridFsStream } from '../dbConnection.js'

const log = logger.child({ label: 'imageFileService' })

async function getImageFileById(id) {
	try {
		const image = await ImageModel.findOne({ _id: id })

		if (!image) {
			log.info(`Image with id: ${id} not found`)
			return
		}
		const imageFile = await gridFsStream.find({}, { _id: image.fileId }).toArray()

		if (!imageFile[0] && imageFile.length === 0) {
			log.info(`Image file with id: ${id} not found`)
			return
		}

		log.info(`Image file with id: ${id} found`)

		return image
	} catch (e) {
		log.error(`Error fetching image ${id}: `, e)
		throw new Error(`Error fetching image ${id}`)
	}
}

const ImageFileService = {
	getImageFileById,
}

export default ImageFileService
