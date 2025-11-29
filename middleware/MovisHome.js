// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  const imageTypes = /jpeg|jpg|png|webp|gif|avif/;
  const videoTypes = /mp4|mov|avi|mkv/;

  const extname = path.extname(file.originalname).toLowerCase().substring(1);
  if (imageTypes.test(extname) || videoTypes.test(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Only image/video files allowed!'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;

