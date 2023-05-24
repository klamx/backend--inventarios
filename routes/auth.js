/*
  Rustas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const {
  createUser,
  loginUser,
  revalidateToken,
} = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/fieldsValidator')

const router = Router()

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidator,
  ],
  loginUser
)

router.post(
  '/new',
  [
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('is_admin', 'is_admin es obligatorio').isBoolean(),
    fieldsValidator,
  ],
  createUser
)

router.get('/renew', revalidateToken)

module.exports = router
