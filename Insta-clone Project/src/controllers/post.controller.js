const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createController(req, res) {
    const fileName = req.files.content[0].originalname;
    const buffer = req.files.content[0].buffer;

    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer),'file'),
        fileName: fileName,
    });

    res.send(file);
}

module.exports = { createController };