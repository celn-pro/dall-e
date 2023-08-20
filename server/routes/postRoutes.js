import express from "express";
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import { MongoClient } from "mongodb";

import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()



//GET ALL POSTS
router.route('/').get(async (req,res) => {
const client = new MongoClient(process.env.MONGODB_URL)

    try {
        //const posts = await Post.find({})
        async function run() {
            try {
              const database =  client.db("photoes");
              const allPhotoes = await database.collection("allPhotoes");
              // query for images that have a runtime less than 15 minutes
              //const query = { runtime: { $lt: 15 } };
              //const options = {
                // sort returned documents in ascending order by title (A->Z)
                //sort: { title: 1 },
                // Include only the `title` and `imdb` fields in each returned document
                //projection: { _id: 0, title: 1, imdb: 1 },
              //};

               // query for movies that have a runtime less than 15 minutes
                const query = {};
                const options = {};
                //const cursor = movies.find(query, options);

              const posts = await allPhotoes.find(query, options).toArray()

              // print a message if no documents were found
              if ((await allPhotoes.countDocuments(query)) === 0) {
                console.log("No documents found!");
              }
              

              res.status(200).json({success:true, data: posts})
            } finally {
              await client.close();
            }
          }
          run();

       
    } catch (error) {
        res.status(500).json({success:false, message: error})
        
    }
})

//CREATE A POST
router.route('/').post(async (req,res) => {
const client = new MongoClient(process.env.MONGODB_URL)


   try {
    const bodyForm = req.body.form
    const {name, prompt, photo} = bodyForm
    console.log(prompt)

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
  })
    console.log('before cloudinary upload')
   // const photoCloudinary = await cloudinary.v2.uploader.upload("https://example.com/image.jpg");

  //   cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  // { public_id: "olympic_flag" }, 
  // function(error, result) {console.log(result); });
  
    //const photoUrl = photoCloudinary.url
    // const newPost = await Post.create({
    //     name,
    //     prompt,
    //     photo: photoUrl.url,
    // })
    console.log('about to trigger run-----')
    async function run(name, prompt, photo) {
        try {
          console.log("just entered post-------")
          const database =  client.db("photoes");
          //await database.createCollection("allPhotoes");
          const allPhotoes = database.collection("allPhotoes")
          // create an array of documents to insert
          const image =   { name: name, prompt: prompt, photo: photo}
          
          // this option prevents additional documents from being inserted if one fails
        //   const options = { ordered: true };

        console.log("inserting data now--------------------------------")
          const result = await allPhotoes.insertOne(image);
          console.log(`${result.insertedId} documents were inserted`);

          res.status(200).json({success: true, data: result})
        } finally {
          await client.close();
        }
      }

      run(name, prompt, photo);
      
    console.log("here is new Post made")
   
   } catch (error) {
    res.status(500).json({success:false, message:error})
   }
})


export default router