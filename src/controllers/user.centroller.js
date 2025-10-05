import { apierror } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler( async (req,res) => {

   // get user details from frontend 
    const {username,email,fullname,password} = req.body
   console.log("email ", email);

   // validation  - not empty 
      if(
    [fullname, email,username,password].some((field) => {
         field?.trim() ===""
    })
   ){
    throw new apierror(400,"all field are requried")

   }

   //check if user already exists: username or email 
  const exitedUser =   User.findOne({
        $or:[{ username },{ email }]
    })
    if(exitedUser){
        throw new apierror(409, "user with username already exist ")
    }
   //check avtar is thre or not  images 
    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverimage = req.files?.coverimage[0]?.path

    if(!avatarLocalpath){
        throw new apierror(404,"Avatar file is requried")
    }
   //upload them to cloudinary ,avtar is ther is not 
     
  const avatar =await uploadOnCloudinary(avatarLocalpath)
  const coverImage = await uploadOnCloudinary(coverimage)
  if(!avatar){
    throw new apierror(404,"avtar is not found ")
  }
   //crete user object -crete entry in db 
  const user =await User.create({
    fullname,
    avatar : avatar.url,
    coverimage : coverImage.url?.url || "",
    username : username.toLowerCase(),


 })
 
   //remove passwordfrom token fiels from response 
   //check for user creation 
    const createdUser =await User.findById(user._id).select(
        "-password -refreshToken"
    )
   //return response 

   if(!createdUser){
    throw new apierror(500 ,"something went wrong in registering the user ")
   }


   return res.status(201).json({
    createdUser

   }
    
   )



 





})

export {registerUser}