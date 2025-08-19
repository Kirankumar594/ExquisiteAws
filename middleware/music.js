import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/music';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [
    '.jpg', '.jpeg', '.png', '.gif',     // images
    '.mp3', '.wav', '.ogg', '.flac',     // audio
    '.mp4', '.mov', '.avi', '.mkv'       // video
  ];
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only image, audio, or video files are allowed!'));
};

export const upload = multer({ storage, fileFilter });
