const imagekit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');


const client = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function fileUpload({ buffer, fileName, folder = '' }) {

    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName: fileName,
        folder: folder
    })

    return file;
}



module.exports = fileUpload