import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET                                                             
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}




// Function to delete an image from Cloudinary
const deleteImage = async (photo_publicId) =>{
  try{
    await cloudinary.uploader.destroy(photo_publicId, function(error, result) {
    if (error) {
      throw('Error deleting image:', error);
    } else {
      console.log('Image deleted successfully:', result);
    }
  });
}catch(err){
  console.log(err);
}
}



export {uploadOnCloudinary, deleteImage}