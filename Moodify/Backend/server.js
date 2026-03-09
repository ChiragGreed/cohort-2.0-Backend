const app = require('./src/app');
const ConnecToDb = require('./src/config/database');
require('dotenv').config();


ConnecToDb();

app.listen(6010, () => {
    console.log('Server is running at Port 6010');
})