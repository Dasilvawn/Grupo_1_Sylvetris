
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
        `${entityOrFolderName}-${Date.now()}-${file.originalname}`
      );
    },
  });

  const fileFilter = (req, file, callback) => {
    if (!/image/.test(file.mimetype)) {
      req.fileValidationError = "Archivo invalido";

      return callback(null, false);
    }
   
    callback(null, true);
  };

  const uploads = {};
  uploads[entityOrFolderName] = multer({
    storage,
    fileFilter,
  });

  return uploads[entityOrFolderName];
};

module.exports = {
  uploadImageProduct: createStorage("products"),
  uploadImageAvatar: createStorage("avatars"),
};
