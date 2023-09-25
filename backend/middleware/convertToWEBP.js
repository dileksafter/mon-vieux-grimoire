
const sharp = require('sharp'); // Import the sharp library

module.exports = (req, res, next) => {
    if (req.file && req.file.path) {
        sharp(req.file.path)
            .webp({ quality: 20 }) // Adjust quality as needed
            .toFile(req.file.path.replace(/\..+$/, '.webp'), (err) => {
                if (err) {
                    return next(err);
                }
                next();
            });
    } else {
        next();
    }
};
