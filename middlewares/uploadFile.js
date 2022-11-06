
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { MulterError } = require("multer");

const createStorage = (entityOrFolderName = "products") => {
  const folder = path.join(__dirname, `../public/images/${entityOrFolderName}`);

  /* Si la carpeta no existe la crea */
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/images/${entityOrFolderName}`);
    },
    filename: (req, file, callback) => {
      callback(
        null,
        /* `${entityOrFolderName}-${Date.now()}-${file.originalname}` */
        `${entityOrFolderName}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (/image/.test(file.mimetype)) {
      cb(null, true);
  } else {
      return cb(new MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
  };

  const uploads = {};
  uploads[entityOrFolderName] = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2000000, files: 1 }, 
  });

  return uploads[entityOrFolderName];
};

module.exports = {
  uploadImageProduct: createStorage("products"),
  uploadImageAvatar: createStorage("avatars"),
};
