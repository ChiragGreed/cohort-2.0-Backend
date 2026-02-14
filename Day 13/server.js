const app = require('./src/app.js');
const ConnectToDb = require('./src/config/database.js')
require('dotenv').config();

ConnectToDb();

app.listen(7000,()=>{
    console.log("Server running at port 7000");
})