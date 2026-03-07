const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true,
        ref: 'users'
    },
    requestee: {
        type: String,
        required: true,
        ref: 'users'
    }

}, { timestamps: true })

requestSchema.index({ requester: 1, requestee: 1 }, { unique: true });


const requestModel = mongoose.model('requestes', requestSchema);

module.exports = requestModel;