import ImageModel from '../models/imageModel.js'
import logger from '../logger.js'

const log = logger.child({ label: 'imageService' })

/**
 * @typedef Image
 * @type {object}
 * @property {string} id - image ID in db
 * @property {string} filename - filename of image
 * @property {string} fileId - fileID of image mapped to uploads collection.
 * @property {string} metadata - metadata provided as part of image
 */

/**
 * Transforms image from db, removing __v and _id -> id.
 *
 * @param {Object} imageModelObject
 * @param {string} imageModelObject._id - image ID in db
 * @param {string} imageModelObject.filename - filename of image
 * @param {string} imageModelObject.fileId - fileID of image mapped to uploads collection.
 * @param {string} imageModelObject.metadata - metadata provided as part of image
 * @returns {Image} Client friendly Image object
 */
function transformImageFromDb({ _id, filename, fileId, metadata }) {
	return {
		id: _id,
		filename,
		fileId,
		metadata,
	}
}

/**
 * Adds Image reference in Image Collection to image data stored in uploads collection
 *
 * @param {Object} imageData - Image data after storing the image in uploads collection
 * @returns {Image} Image object stored in db
 */
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

/**
 * Fetches all existing images data
 *
 * @returns {Image[]} List of existing images
 */
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

/**
 * Fetch a single image using id provided
 *
 * @param {string} id - Id for the specific image to fetch
 * @returns {Image} image requested
 */
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

/**
 * Updates image reference for given id to match new uploaded image
 *
 * @param {string} imageId - Id of image to be updateTodoById
 * @param {Object} imageData - image data after storing it in uploads collection
 * @param {string} imageData.filename - filename as stored in uploads collection
 * @param {string} imageData.id - new id for image stored in uploads collection
 * @param {string} imageData.metadata - metadata stored in uploads collection
 * @returns {Boolean} true if an image was updated, false otherwise
 */
async function updateImageById(imageId, { filename, id, metadata }) {
	try {
		console.log('imageId', imageId)
		const update = await ImageModel.updateOne({ _id: imageId }, { filename, fileId: id, metadata })
		if (update.nModified === 0) {
			log.info(`Image with id ${imageId} not found. Nothing updated.`)
			return false
		}
		log.info(`Successfully updated image with id ${imageId}`)

		return true
	} catch (e) {
		log.error(`Error updating image ${imageId}: `, e)
		throw new Error(`Error updating image ${imageId}`)
	}
}

/**
 * Delete an image by id
 *
 * @param {string} id - Id of image to be delete
 * @returns - nothing
 */
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
