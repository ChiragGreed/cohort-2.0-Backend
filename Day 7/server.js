const app = require('./src/app.js');
const ConnectToDb = require('./src/config.js');

ConnectToDb();

app.listen('4000', () => {
    console.log("Server is running");
})