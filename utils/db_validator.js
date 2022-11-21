const db = require("../database/models");

const existUserById = async (id) => {
  // Verificar si el cid
  const existeUsuario = await db.User.findByPk(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};
const existUserByEmail = async (email) => {
  // Verificar si el correo existe
  const existeEmail = await db.User.findOne({
    where: {
      email,
    },
  });
  if (existeEmail) {
    throw new Error(`Este email ya está registrado`);
  }
};

module.exports = {
  existUserById,
  existUserByEmail,
};
