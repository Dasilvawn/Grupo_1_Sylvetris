const fs = require("fs");
const path = require("path");

const loadUsers = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
  );
};

const storeUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(users, null, 3),
    "utf-8"
  );
};

const loadProducts = () => {
  const productsFilePath = path.join(__dirname, 'products.json');
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  return products
}

const storeProducts = (products) => {
  fs.writeFileSync(path.join(__dirname, 'products.json'),JSON.stringify(products, null, 3), 'utf-8');
}

module.exports = {
  loadUsers,
  storeUsers,
  loadProducts,
  storeProducts

};
