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

async function getImageById(id) {
	try {
		const image = await ImageModel.findOne({ _id: id })

		log.info(`Image with id ${id} ${image ? 'found' : 'not found'}`)

		return image && transformImageFromDb(image)
	} catch (e) {
		log.error(`Error fetching image ${id}: `, e)
		throw new Error(`Error fetching image ${id}`)
	}
}

async function updateImageById(imageId, { filename, id, metadata }) {
	try {
		await ImageModel.updateOne({ _id: imageId }, { filename, fileId: id, metadata })

		log.info(`Successfully updated image with id ${imageId}`)

		return
	} catch (e) {
		log.error(`Error updating image ${imageId}: `, e)
		throw new Error(`Error updating image ${imageId}`)
	}
}

async function deleteImageById(id) {
	try {
		await ImageModel.deleteOne({ _id: id })

		log.info(`Successfully deleted image with id ${id}`)

		return
	} catch (e) {
		log.error(`Error deleting image ${id}: `, e)
		throw new Error(`Error deleting image ${id}`)
	}
}

const ImageService = {
	addImageToDb,
	getAllImages,
	getImageById,
	updateImageById,
	deleteImageById,
}

export default ImageService
