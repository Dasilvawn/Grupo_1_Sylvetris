const { Router } = require("express");
const ImageKit = require('imagekit');
const router = Router();

/**
 * {{url}}/api/imageKit
 */

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  });

router.get("/", function (req, res) {
  let result = imagekit.getAuthenticationParameters();
  res.send(result);
}); 

module.exports = router;