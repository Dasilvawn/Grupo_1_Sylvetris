const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const newUserValidator = require("../../validations/newUserValidator");

const getUsersApi = async (req, res) => {
  try {
   
    const users = await db.User.findAll({
      
          attributes: ['id', 'name', 'lastname', 'email']
    });

    const userResp = users.map(user => {
      return {
        ...user.dataValues,
        urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/${user.id}`,
      }
    })

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        count: users.length
      },
      data: {
        users: userResp
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
   
    const user = await db.User.findByPk(req.params.id,{
        attributes: {
           exclude:['deletedAt','password', 'createdAt', 'updatedAt'],
          }
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

    let [image] = req.files.map((file) => file.filename);

    let newUser = await db.User.create({
      name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rolId: rol,
        phone: phone ? phone : null,
        dni: dni ? dni : null,
        avatar: image ? image : "user_default.png",
    })

    const newAddress = await db.Address.create({
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
       user: {id : newUser.id },
      
      }
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


};
const deleteUsersApi = async (req, res) => {};

module.exports = {
  getUsersApi,
  getUserApi,
  postUsersApi,
  putUsersApi,
  deleteUsersApi,
};
