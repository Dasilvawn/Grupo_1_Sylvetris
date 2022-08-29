const path = require('path');
const multer = require('multer');

const storageImageProduct = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/avatars' )
    },
    filename : (req,file,callback) => {
        callback(null,'product-' + Date.now() + path.extname(file.originalname))
        /* callback(null,`product-${Date.now()}${path.extname(file.originalname)}`) */
    }
});

const uploadImageProduct = multer({
    storage : storageImageProduct
});

module.exports = {
    uploadImageProduct
}