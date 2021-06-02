import express from 'express'
import multer from 'multer'

import addImage from '../controllers/addImageController.js'
import getAllImages from '../controllers/getAllImagesController.js'
import getImageById from '../controllers/getImageByIdController.js'
import updateImageById from '../controllers/updateImageByIdController.js'
import deleteImageById from '../controllers/deleteImageByIdController.js'
import { createGridFsStorage } from '../dbConnection.js'

const imageRoutes = express.Router()
const upload = multer({ storage: createGridFsStorage() })

imageRoutes.get('/all/', getAllImages)

imageRoutes.post('/image/', upload.single('catPic'), addImage)
imageRoutes.get('/image/:id?/', getImageById)
imageRoutes.put('/image/:id?/', upload.single('catPic'), updateImageById)
imageRoutes.delete('/image/:id?/', deleteImageById)

export default imageRoutes
