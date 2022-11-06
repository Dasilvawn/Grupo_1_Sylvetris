const { literal } = require("sequelize");
// avatar    urlAvatar
const imageUrl = (
  req,
  field,
  alias,
  pathRoute = "/products"
) => {
  const urlImage = () => `${req.protocol}://${req.get("host")}${pathRoute}/image/`;

  return [literal(`CONCAT( '${urlImage()}', ${field} )`), alias];
};

module.exports = { imageUrl }