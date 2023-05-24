const { response } = require('express')
const { User } = require('../models/User')
const { sequelize } = require('../database/config')

const createUser = async (req, res = response) => {
  const { username, email, password, is_admin } = req.body
  try {
    await User.sync()

    let user = await sequelize.query(
      `select *
    from "Users" as users
    where users.email = '${email}' or users.username = '${username}'`,
      {
        model: User,
        mapToModel: true,
      }
    )

    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe el correo o el nombre de usuario',
      })
    }

    const createUser = await User.create({
      username,
      email,
      password,
      is_admin,
    })

    return res.status(201).json({
      ok: true,
      msg: 'registro',
      username,
      email,
      id: createUser.user_id,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
    })
  }
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body

  res.json({
    ok: true,
    msg: 'register',
    email,
    password,
  })
}

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
}
