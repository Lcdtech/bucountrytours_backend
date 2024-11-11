const multer = require('multer');
const { v4 } = require('uuid');
const docFilter = (req, file, cb) => {
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './template');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${v4()}-${file.originalname}`);
  }
});
const uploadFile = multer({ storage, fileFilter: docFilter });

module.exports = uploadFile;