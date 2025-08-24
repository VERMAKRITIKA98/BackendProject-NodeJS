// for file upload

import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'; //node js file system

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadFileOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto" //which type of file pdf, video etc.
        })
        console.log("file successfully uploaded", response)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadFileOnCloudinary}