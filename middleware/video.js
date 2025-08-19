import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/videos';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.webm'];
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only image/video files are allowed!'));
};

export const upload = multer({ storage, fileFilter });
