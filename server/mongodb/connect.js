import mongoose from "mongoose";
import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv'

dotenv.config()


const client = new MongoClient(process.env.MONGODB_URL)


// const connectDB = (url) => {
//     mongoose.set('strictQuery', true)

//     mongoose.connect(url)
//         .then(()=>console.log('MongoDB connected'))
//         .catch((err)=> console.log(err))
// }

// export default connectDB