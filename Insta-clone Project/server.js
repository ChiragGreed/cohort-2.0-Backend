require('dotenv').config();
const app = require('./src/app.js');
const ConnectToDb = require('./src/config/database.js');


ConnectToDb();

app.listen(3900,()=>{
    console.log('Server running at Port 3900')
})

