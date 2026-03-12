const Nodeid3 = require('node-id3');
const fileUpload = require('../services/storage.service');
const songModel = require('../models/songModel');

const songController = async (req, res) => {
    const songbuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = Nodeid3.read(songbuffer);

    const [songUrl, coverUrl] = await Promise.all([

        fileUpload({
            songbuffer,
            fileName: tags.title, buffer: songbuffer,
            folder: '/Moodify/songs'
        }),

        fileUpload({
            buffer: tags.image.imageBuffer,
            fileName: 'cover',
            folder: '/Moodify/cover'
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        songUrl: songUrl.url,
        coverUrl: coverUrl.url,
        artist: tags.artist,
        mood
    })

    res.status(201).json({
        message: "Song uploded",
        song
    })

}

const getSongController = async (req, res) => {
    const { mood } = req.query;

    if (!mood) return res.status(400).json({
        message: "Mood value is required"
    })

    const songs = await songModel.find({ mood });

    if (!songs) return res.status(200).json({
        message: `No songs found for ${mood} mood`
    })

    res.status(200).json({
        message: `Fetche songs for ${mood} mood`,
        songs
    })
}


module.exports = {
    songController,
    getSongController
}