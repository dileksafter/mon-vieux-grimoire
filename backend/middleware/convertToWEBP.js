const sharp = require('sharp');
const fs = require('fs');


module.exports = (req, res, next) => {
    if (req.file && req.file.path.includes('.webp')) {
        return next()
    }
    if (req.file && req.file.path) {
        sharp(req.file.path)
            .webp({ quality: 60 })
            .toFile(req.file.path.replace(/\..+$/, '.webp'), (err) => {
                if (err) {
                    return next(err);
                }
                const imagePath = req.file.path.split('images/')[1];
                fs.unlinkSync(`images/${imagePath}`);
                next();
            });
    } else {
        next();
    }
};
