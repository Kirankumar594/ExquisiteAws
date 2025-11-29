const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = 'uploads/media';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.webm', '.mp3', '.wav'];
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only image/video/audio files are allowed!'));
};

const upload = multer({ storage, fileFilter });


module.exports = upload;
