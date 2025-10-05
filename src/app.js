import express from "express"
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";


app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials:true 
    }
))


app.use(express.json({
    limit:"16kb"
}))


app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

app.use(express.static("public")) // files folder store images jisko koi bhi excess kar saktha hai 
app.use(cookieParser( ))




//routes
app.use("/users", userRouter)

export {app}