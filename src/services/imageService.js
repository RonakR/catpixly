import ImageModel from '../models/imageModel.js'
import logger from '../logger.js'

const log = logger.child({ label: 'imageService' })

function transformImageFromDb({ _id, filename, fileId, metadata }) {
	return {
		id: _id,
		filename,
		fileId,
		metadata,
	}
}

async function addImageToDb(imageData) {
	try {
		const image = await ImageModel.create({
			filename: imageData.filename,
			fileId: imageData.id,
			metadata: imageData.metadata,
		})

		log.info(`Image Added to Images Collection with ID: ${image._id}`)

		return transformImageFromDb(image)
	} catch (e) {
		log.error('Error creating new image: ', e)
		throw new Error('Error creating new image')
	}
}

async function getAllImages() {
	try {
		const images = await ImageModel.find({})

		log.info(`Fetch all images successfully returned with ${images.length} images.`)

		return images.length > 0 ? images.map(transformImageFromDb) : []
	} catch (e) {
		log.error('Error fetching all images: ', e)
		throw new Error('Error fetching all images')
	}
}

const ImageService = {
	addImageToDb,
	getAllImages,
}

export default ImageService
