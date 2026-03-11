const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    sizeLimit: 1024 * 1024 * 5
});


module.exports = upload