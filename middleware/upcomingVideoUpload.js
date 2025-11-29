// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const folderPath = 'uploads/upcoming-movies';
// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, folderPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp|gif|mp4|mov|avi/;
//   const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const isValidMime = allowedTypes.test(file.mimetype);
//   if (isValidExt && isValidMime) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image and video files are allowed!'));
//   }
// };

// const uploadUpcomingMovie = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
// }).fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'video', maxCount: 1 },
// ]);
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const folderPath = 'uploads/upcoming-movies';
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderPath),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

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

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

const uploadUpcomingMovie = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);


module.exports = { uploadUpcomingMovie };
