import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ImageSchema = new Schema({
	filename: {
		type: String,
		required: true,
	},
	fileId: {
		type: String,
		required: true,
	},
	metadata: {
		type: String,
	},
})

const ImageModel = mongoose.model('Image', ImageSchema)

export default ImageModel
