const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const path = require("path");
const { imageUrl } = require("../../utils/imageUrl");
const fs = require("fs");

const getImage = (req, res) => {
  res.sendFile(
    path.join(__dirname, `../../public/images/avatars/${req.params.img}`)
  );
};
const getUsersApi = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "name", "lastname", "email"],
    });

    const userResp = users.map((user) => {
      return {
        ...user.dataValues,
        urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/${
          user.id
        }`,
      };
    });

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        count: users.length,
      },
      data: {
        users: userResp,
      },
    });
  } catch (error) {
    return res.status(200).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
};
const getUserApi = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      include: [
        {
          association: "address",
          attributes: {
            exclude: ["userId", "deletedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["deletedAt", "password"],
        include: [imageUrl(req, "avatar", "avatar", "/api/users")],
      },
    });

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
      },
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
};
const postUsersApi = async (req, res) => {
  console.log(req.baseUrl);
  try {
    const {
      name,
      lastname,
      email,
      password,
      rol,
      address,
      country,
      state,
      city,
      cp,
      phone,
      dni,
    } = req.body;

    const image = req.file?.filename;

    let newUser = await db.User.create({
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password: bcryptjs.hashSync(password, 12),
      rolId: rol,
      phone: phone ? phone : null,
      dni: dni ? dni : null,
      avatar: image ? image : "user_default.png",
    });

    await db.Address.create({
      address: address ? address.trim() : null,
      country: country ? country.trim() : null,
      state: state ? state.trim() : null,
      city: city ? city.trim() : null,
      cp: cp ? cp : null,
      userId: newUser.id,
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      data: {
        urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/${
          newUser.id
        }`,
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
};
const putUsersApi = async (req, res) => {
  try {
    const {
      name,
      lastname,
      rol,
      address,
      country,
      state,
      city,
      cp,
      phone,
      dni,
    } = req.body;

    let editUser = await db.User.findByPk(req.params.id, {
      include: ["address"],
    });
    let editAddress = await db.Address.findByPk((id = editUser.address[0].id));
    
    const image = req.file?.filename;
    const file = `./public/images/avatars/${editUser.avatar}`


    editUser.name = name?.trim() || editUser.name;
    editUser.lastname = lastname?.trim() || editUser.lastname;
    editUser.rolId = +rol || editUser.rolId;
    editUser.phone = phone || editUser.phone;
    editUser.dni = dni || editUser.dni;
    editUser.avatar = image || editUser.avatar;

    editAddress.address = address?.trim() || editAddress.address;
    editAddress.country = country?.trim() || editAddress.country;
    editAddress.state = state?.trim() || editAddress.state;
    editAddress.city = city?.trim() || editAddress.city;
    editAddress.cp = +cp || editAddress.cp;
    
    if (image && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    await editUser.save();
    await editAddress.save();

    return res.status(201).json({
      ok: true,
      status: 201,
      data: {
        urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/${editUser.id}`,
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
};
const deleteUsersApi = async (req, res) => {
  try {
    const userDelete = await db.User.findByPk(req.params.id, {
      include: ["address"],
    });

    const addressDelete = await db.Address.findByPk(userDelete.address[0].id);

    const file = `./public/images/avatars/${userDelete.avatar}`

    if (userDelete.avatar !== "user_default.png" && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    await addressDelete.destroy();
    await userDelete.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
};

module.exports = {
  deleteUsersApi,
  getImage,
  getUserApi,
  getUsersApi,
  postUsersApi,
  putUsersApi,
};
