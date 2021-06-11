write notes on how to run docker compose in background and only view logs for node app since it's noisy

# Catpixly API

This RESTful API provides as CRUD interface to store and access Cat Pics.
(We do not validate that this is a cat pic, honor system 🤫)

Some technical specifications:

- The project is running on NodeJs
- The API layer is powered by [Expressjs](https://expressjs.com/)
- The database of choice here is [MongoDb](https://www.mongodb.com/)
- The middleware for handling `multipart/form-data` is [Multer](https://www.npmjs.com/package/multer).
- The storage engine in MongoDb for images is [GridFS](https://docs.mongodb.com/manual/core/gridfs/)

## Setup

After you have cloned this repo locally, there are two ways of getting up and running:

### Local Development

To run this locally, you will first need mongoDb up and running.

- run `npm install`
- create a file called `.env`
- copy over the contents of `.env.example` and update as necessary
- run `npm run dev`

Local development does provide hot-reloading on changes.

### Docker Compose

- run `docker compose up --build` the first time
- after that `docker compose up` should do the trick

The log from MongoDb can get a little noisy, here's an alternative to follow only the catpixly-api logs:

- run `docker compose build` if you haven't yet
- run `docker compose up -d` to run docker compose in the background
- run `docker logs catpixly-api -f` to follow only catpixly-api logs
- run `docker compose down` when done

## Interacting with the API

A postman collection is provided in this repo in the postman folder.

You will need to import both the `...collection.json` and `...environment.json`.

### API Spec

| Method | Endpoint           | Headers                            | Request Parameters | Request Body   | Response                  | Response Status Code |
| ------ | ------------------ | ---------------------------------- | ------------------ | -------------- | ------------------------- | -------------------- |
| GET    | /images/all        | N/A                                | N/A                | N/A            | An array of Images Object | 200 OK               |
| POST   | /images/image/     | Content-Type = multipart/form-data | N/A                | catPic = Image | Image Object              | 200 OK               |
| GET    | /images/image/:id/ | N/A                                | id = Image Id      | N/A            | Image Object              | 200 OK               |
| PUT    | /images/image/:id/ | Content-Type = multipart/form-data | id = Image Id      | catPic = Image | String                    | 200 OK               |
| DELETE | /images/image/:id/ | N/A                                | id = Image Id      | N/A            | N/A                       | 204 No content       |
| GET    | /images/file/:id/  | N/A                                | id = Image Id      | N/A            | Readable Stream           | 200 OK               |

### Testing the API

A proper path to test this API would look like:

- Add Image To Db x2
  - Inside `Body`, select the file to upload
  - This will automatically store the most recent id in a variable `recentImageId`
- Get All Images
- Get Image By Id
  - Uses the Id stored in `recentImageId` from the `POST` to Add Image
- Get Image File By Id
  - Uses `recentImageId`
- Update Image By Id
  - Inside `Body`, select the file to upload
  - Uses `recentImageId`
- Delete Image By Id
  - Uses `recentImageId`

There is also a low-code landing page at `http://localhost:3000/` to help upload images, although it does to fetch them too.

## Additions to make to the project

- Testing (probably with Jest)
- Better frontend, with React
- Swagger docs for API spec instead of markdown
- Auth
- Better error handling and logging

- Maybe a way to join the two collections so we do not have Images and Uploads to keep track of.

TODO: Learn multer and multipart form data, gridfs
