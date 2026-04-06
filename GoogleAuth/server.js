import express from 'express'
import {config} from 'dotenv'
import {transport} from transport

config();
const app = express();

app.get('/auth/google',(req,res)=>{
    transport.authenticate({fallbackurl:''})
})

app.get('/auth/google/callback',(req,res)=>{
    
})

export default app;