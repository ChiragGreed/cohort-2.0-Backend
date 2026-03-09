const mongoose = require('mongoose')

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDb Connected")
    })
}

module.exports = ConnectToDb