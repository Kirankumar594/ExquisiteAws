import multer from 'multer';
import fs from 'fs';
import path from 'path';



const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|mp4|mov|avi/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);
  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'));
  }
};

export const uploadVideoGridHome = multer({

  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);
