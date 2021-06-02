import express from 'express'
import multer from 'multer'

import addImage from '../controllers/addImageController.js'
import getAllImages from '../controllers/getAllImagesController.js'
import { createGridFsStorage } from '../dbConnection.js'

const imageRoutes = express.Router()
const upload = multer({ storage: createGridFsStorage() })

imageRoutes.get('/all', getAllImages)
imageRoutes.post('/addImage', upload.single('catPic'), addImage)

export default imageRoutes
