// Title: Doubt solving app backend.
// Author: Md Samiul Islam.
// Project Owner: Md Samiul Islam
// Description: This is a student's doubt solving app. There are student upload your own problem or doubt that can be solve teachers or Teaching Assistants. Also can be commnet another student and inside of this project have many features.  

const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express");
const port = process.env.PORT || 5000;
require('dotenv').config();


// Middle ware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", async(req,res)=>{
    res.send("Server started successfully !!")
});
// Port listeing
app.listen(port, () =>{
    console.log(`Port listening at ${port}`)
});