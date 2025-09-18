// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Create uploads directory if it doesn't exist
// const uploadsDir = 'uploads/';
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function(req, file, cb) {
//         // Use original fieldname (should be 'images' for multiple files)
//         cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
//     }
// });

// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|avif|gif|webp/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Error: Images only (jpeg, jpg, png, gif, avif, webp)!'));
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: { 
//         fileSize: 10000000,  // 10MB per file
//         files: 10           // Maximum 10 files
//     }, 
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb);
//     }
// });

// export default upload;

import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|avif|mp4|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image/video allowed"));
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});
