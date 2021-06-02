import express from 'express'

import addImage from '../controllers/addImageController.js'

const imageRoutes = express.Router()

imageRoutes.post('/addImage', addImage)

export default imageRoutes
