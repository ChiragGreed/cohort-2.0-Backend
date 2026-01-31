const express = require('express');
const app = express();

app.use(express.json());

const Notes = [];

app.get("/notes",(req,res)=>{
    res.send(Notes);
})

app.post("/notes",(req,res)=>{
    Notes.push(req.body);
    res.send("Note created");
})

app.delete("/notes/:idx",(req,res)=>{
    delete(Notes[req.params.idx]);
    res.send("Note deleted");
})

app.patch("/notes/:idx",(req,res)=>{
    Notes[req.params.idx].title = req.body.title;
    
    res.send("Note patched");
})

module.exports = app;