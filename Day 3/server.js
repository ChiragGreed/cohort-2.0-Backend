const express = require('express');
const app = express();

app.use(express.json());

const Notes = [];

app.post('/notes',(req,res)=>{
    Notes.push(req.body);
    
    res.send("Node created");
})

app.get('/notes',(req,res)=>{
    res.send(Notes);
})



app.listen(7000,()=>{
    console.log("Server runnig at 7000");
});