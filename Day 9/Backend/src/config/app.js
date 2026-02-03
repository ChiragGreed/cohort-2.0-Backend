const express = require('express');
const noteModel = require('../models/note.modle.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/notes',async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Fetched notes from DB",
        notes
    })
})

app.post('/api/notes',async (req,res) =>{
    const {title,description} = req.body;
    const note = await noteModel.create({title,description});
   
    res.status(201).json({
        message:"Note created",
        note
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note deleted"
    })
})


app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    const {title} = req.body;

    await noteModel.findByIdAndUpdate(id,{description});
    await noteModel.findByIdAndUpdate(id,{title});
    
    res.status(200).json({
        message:"Note updated"
    })
})

module.exports = app;