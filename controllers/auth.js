const { response } = require('express')
const bcrypt = require('bcryptjs')
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

    // encripta contraseñá
    const salt = bcrypt.genSaltSync()
    const pass = bcrypt.hashSync(password, salt)

    const createUser = await User.create({
      username,
      email,
      password: pass,
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

const loginUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({where: {
      email
    }})

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseñá incorrectos"
      })
    }

    // validar contraseñá
    const validatePassword = bcrypt.compareSync(password, user.password)
    
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseñá incorrectos"
      })
    }

    // Generar JWT

    return res.json({
      ok: true,
      id: user.user_id,
      username: user.username,
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al loguearse',
    })
  }
  
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
