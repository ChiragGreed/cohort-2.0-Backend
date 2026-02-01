const app = require('./src/config/app.js');
const ConnectToDb = require('./src/config/database.js');

ConnectToDb();


app.listen("4000",()=>{
    console.log("Server is running at port 4000");
})