const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    description: String
})

const notemodel = mongoose.model("notes", notesSchema);

module.exports = notemodel;