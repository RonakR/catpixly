import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ImageSchema = new Schema({
	filename: {
		type: String,
		required: true,
	},
})

const ImageModel = mongoose.model('Image', ImageSchema)

export default ImageModel
