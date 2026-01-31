const app = require('./src/app.js');
const mongoose = require('mongoose');

function ConnectToDb() {
    mongoose.connect('mongodb+srv://Chirag:5VhlEhv95J0sK9De@clusterpractice0.ofljgrv.mongodb.net/Day-6-Practice')
        .then(() => {
            console.log("Database is connected");
        })
}

ConnectToDb();

app.listen('4000', () => {
    console.log("Server is running");
})