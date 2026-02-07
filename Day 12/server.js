require('dotenv').config();
const connectToDb = require('./src/config/database.js');
const app =  require('./src/app.js');

connectToDb();

app.listen('6000',(req,res)=>{
    console.log("Server is running at port 6000");
})
