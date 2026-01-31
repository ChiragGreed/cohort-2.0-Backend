const express = require('express');
const notemodel = require('./models/notes.model.js')
const app = express();

app.use(express.json());


app.get("/notes",async (req,res)=>{
   const notes = await notemodel.find();

    res.status(200).json({
        message:"Notes fetched succesfully",
        notes});
})


app.post("/notes",async (req,res)=>{
    const {title,description} = req.body;
    
    // Creating a note on databse
    const note = await notemodel.create({title,description})
    
    res.status(201).json({
        message:"Note created",
        note
    });
})

module.exports = app;