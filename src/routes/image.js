import express from 'express'
import multer from 'multer'

import addImage from '../controllers/addImageController.js'
import { createGridFsStorage } from '../dbConnection.js'

const imageRoutes = express.Router()
const upload = multer({ storage: createGridFsStorage() })

imageRoutes.post('/addImage', upload.single('catPic'), addImage)

export default imageRoutes
