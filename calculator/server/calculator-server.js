
//---geting the tools---
const express = require("express");  // web server toolkit
const {MongoClient} = require('mongodb'); // imports teh librayr
const cors = require('cors');  //middleware to connect front and back running on different ports
require('dotenv').config(); // to hide sesitive information thast critical to this server

//---server and database addresses---
const app = express(); //creates an insatce of the server
const port = 3001;

const URI = process.env.MONGODB_URI;
const client = new MongoClient(URI); // object that manages our connection to the database


//---Middleware---
     // security checkpoint and translation
app.use(cors()) ; //requests must only come from the frontend
app.use(express.json()); // auto converts all and any JSON data sent to the server to js odject


//---Main Functioning---
async function run() {
  try{
    await client.connect(); //
    const db = client.db('calculator-db');// opens the specific 'calculator-app' file folder in teh database
    console.log('Successfully connected to MongoDB!');

    app.get('/', (req,res)=>{
      res.send('srver is running and connected to MongoDB!')
    });

    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}`);
    });
  } catch(error){
    console.error('Failed to connect to Mongodb ', error);
    process.exit(1);
  }
}

run();