import ImageModel from '../models/imageModel.js'
import logger from '../logger.js'

const log = logger.child({ label: 'imageService' })

async function addImageToDb(filename) {
	try {
		const image = await ImageModel.create({
			filename,
		})

		log.info(`Image Added to Images Collection with ID: ${image._id}`)

		return image
	} catch (e) {
		log.error('Error creating new image: ', e)
		throw new Error('Error creating new image')
	}
}

const ImageService = {
	addImageToDb,
}

export default ImageService
