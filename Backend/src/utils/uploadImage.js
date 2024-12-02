import { ApiResponse } from './ApiResponse.js';
import { asynchandler } from './asynchandler.js'
import { uploadOnCloudinary } from './cloudinary.js'
const uploadImage = asynchandler(async (req, res, next) => {

    const imageLocalPath = req?.file?.path;

    if (!imageLocalPath) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Image file not provided'))
    }

    const response = await uploadOnCloudinary(imageLocalPath)

    if (!response) {
        return res.status(500)
            .json(new ApiResponse(500, {}, 'Unable to upload image '))
    }

    return res.status(200)
        .json(new ApiResponse(200, response, 'Image uploaded successfully !'))
})

export default uploadImage;