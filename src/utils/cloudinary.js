import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDINARY_CLOUD_KEY ,
        api_secret:  process.env.CLOUDINARY_CLOUD_SECRET
})

const uploadOnCloudinary = async (localfilepath) => {
   try{
    if(!localfilepath) return null
    //upload the file on cloudinary
   const response = cloudinary.uploader.upload(loadfilepath,{
       resource_type : "auto"
    })
    //file has been uploaded successful 
  console.log("file is upload on cloudinary",
     response.url
  );
  return response;
   }
   catch(error){
      fs.unlinkSync(localfilepath) //remove the locally saved temporary file as the uplaod operation got failed 
      return null
   }
}
export {uploadOnCloudinary}