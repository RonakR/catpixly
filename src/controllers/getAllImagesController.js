import ImageService from '../services/imageService.js'

export default async function getAllImages(req, res, next) {
	try {
		const images = await ImageService.getAllImages()
		res.send(images)
	} catch (e) {
		res.status(500).send(`Internal Server Error: ${e.message}`)
	}
}
