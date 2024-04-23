const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, 'uploads/images/');
        } else if (file.fieldname === 'audio') {
            cb(null, 'uploads/audio/');
        } else {
            cb(new Error('Неверное поле файла'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const audioTypes = ["audio/mpeg", "audio/mp4", "audio/webm", "audio/vnd.wave", "audio/aac"];
const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "audio" && audioTypes.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === "image" && imageTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Недопустимый тип файла'), false);
    }
};

module.exports = multer({ storage, fileFilter });
