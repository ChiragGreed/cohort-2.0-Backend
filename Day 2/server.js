const express = require('express');

const app = express();


app.get("/",(req,res)=>{
    res.send("Home page");
})

app.get("/about",function(req,res){
    res.send("about Page");
});

app.get("/Product",(req,res)=>{
    res.send("Product Page");
})

app.listen(4000,()=>{
    console.log("Server is running at Port 4000");
});