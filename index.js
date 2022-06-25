// Title: Doubt solving app backend.
// Author: Md Samiul Islam.
// Project Owner: Md Samiul Islam
// Description: This is a student's doubt solving app. There are student upload your own problem or doubt that can be solve teachers or Teaching Assistants. Also can be commnet another student and inside of this project have many features.  

const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middle ware
app.use(cors());
app.use(express.json());

// Connect with DB
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u4spd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
         // db and collection
         await client.connect();
         const database = client.db("doubtStore");
         const userCollection = database.collection("user");
         const doubtCollection = database.collection("allDoubt");
         const commentCollection = database.collection("comments");

         // Get specific user by user
         app.get("/user", async(req,res)=>{
             const email = req.query.email;
             const query = {email};
             const result = await userCollection.findOne(query);
             res.json(result);
            })
            // Get user
            app.get("/alluser", async(req,res)=>{
                const cursor = userCollection.find({});
                const result = await cursor.toArray();
                res.json(result);
            })
            // get all doubt
            app.get("/alldoubt", async(req,res) =>{
                const cursor = doubtCollection.find({});
                const result = await cursor.toArray();
                res.json(result);
            })
            // get apecific doubt by email
            app.get("/yourdoubt", async(req,res)=>{
                const email = req.query.email;
                const query = {email};
                const cursor = doubtCollection.find(query);
                const result = await cursor.toArray();
                res.json(result);
            })
            
            //  Post user
            app.post("/user", async(req,res)=>{
                const user = req.body;
                const result = await userCollection.insertOne(user);
                res.send(result);
            });
            // post doubt
            app.post("/alldoubt", async(req,res)=>{
                const doubt = req.body;
                const result = await doubtCollection.insertOne(doubt);
                res.send(result);
            })
            // post studes comment
            app.post("/studentcomment", async(req,res)=>{
                const comment = req.body;
                const result = await commentCollection.insertOne(comment);
                res.send(result);
            })

    }finally{
        // await client.close();
    }
}
run().catch(console.dir);

// Root route
app.get("/", async(req,res)=>{
    res.send("Server started successfully !!")
});
// Port listeing
app.listen(port, () =>{
    console.log(`Port listening at ${port}`)
});