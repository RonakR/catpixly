import createError from 'http-errors'

import ImageFileService from '../services/imageFileService.js'
import logger from '../logger.js'
import { gridFsStream } from '../dbConnection.js'

const log = logger.child({ label: 'getImageFileByIdController' })

export default async function getImageFileById(req, res, next) {
	try {
		if (!req.params.id) {
			log.error('No image id provided when making a call to add image')
			return next(createError(400, 'No image id provided'))
		}

		const image = await ImageFileService.getImageFileById(req.params.id, res)
		image ? gridFsStream.openDownloadStreamByName(image.filename).pipe(res) : res.send('Image requested does not exist')
	} catch (e) {
		next(e)
	}
}
