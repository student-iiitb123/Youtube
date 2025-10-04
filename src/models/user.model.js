import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { JsonWebToken } from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username : {
    type: String,
    requried: true,
    unique: true,
    lowercase: true,
    trim : true,
    index: true
  },
  email : {
    type: String,
    requried: true,
    unique: true,
    lowercase: true,
    trim : true,
    
  },
  fullname: {
    type: String,
    requried: true,
    trim : true,
    index: true
  },
  avatar : {
    type: String, // cloudinary
    requried: true,
    
    
  },
 coverimage: {
       type: String,
    
 },

 watchHistory : [
    {
  type: Schema.Types.ObjectId,
  ref : "Video"
    }
 ]
 ,
 password: {
    type: String,
    requried: [true,'Password is requried']
 },
 refreshToken: {
    type: string
 },

},
{
    timestamps : true
}
)
// auto generate password  using bcrypt
app.pre("save", function(next){
    //we want t compare is our password is modified or not 
    if(!this.isModified(this.password))  return next();
 this.password =   bcrypt.hash(this.password, 10);
    next();

})
// we can genarte our own method in 
userSchema.methods.isPasswordCorrect = async function(password){
bcrypt.compare(this.password, password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        id: this._id,
        email : this.email,
        username: this.username,
        firstname: this.firstname

 
}, process.env.ACCESS_TOKEN_SECRET),
{
    expirein : process.env.ACCESS_TOKEN_EXPIRY
        }
}



export const  User = mongoose.model('User', userSchema)
