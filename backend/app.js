import express from "express";
import { connectDb } from "./src/db/connectDb.js";
const app = express();
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

app.use(cors());

connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("app is listning on port "+ process.env.PORT);
    })
}).catch((err)=>{
    console.log(err);
})

app.use(express.json()) ;

import userRoute from "./src/routes/user.route.js";

app.use("/user",userRoute);

app.use((err,req,res,next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    if (err.name === "CastError") err.message = "invalid id";
    res.status(statusCode).json({
        success: false,
        message: err.message
    });
  })