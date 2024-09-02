import { DB_NAME } from "../constant.js"
import mongoose from "mongoose";
export const connectDb = async () => {
    try{
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongodb connected !! DB HOST : ${connectionInstance.connection.host}`) ;
    }catch(err){
        console.log("error in db connection !") ;
        console.log(err);
        process.exit(1) ;
    }
}
