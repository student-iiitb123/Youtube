import mongoose from "mongoose";
import {DB_NAME } from "../constant.js";




const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`MONGODB CONNECTED !! DB HOST `)

    }
    catch(error){
        console.log("ERROR :" ,error);
        process.exit(1)
    }
}

export default connectDB;