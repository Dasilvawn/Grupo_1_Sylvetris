const path = require('path');
const multer = require('multer');

const storageImageProduct = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/avatars')
    },
    filename: (req, file, callback) => {
        callback(null, 'product-' + Date.now() + path.extname(file.originalname))
        /* callback(null,`product-${Date.now()}${path.extname(file.originalname)}`) */
    }
});

const uploadImageProduct = multer({
    storage: storageImageProduct
});

const storageImageCreateProduct = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFilename = 'imageproduct' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const uploadImageCreateProduct = multer({
    storage: storageImageCreateProduct
});

module.exports = {
    uploadImageProduct,
    uploadImageCreateProduct
}