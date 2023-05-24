const express = require('express')
const { sequelize } = require('./database/config')
require('dotenv').config()

const app = express()

// db
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.')
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error)
  })

// directorio público
app.use(express.static('public'))
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))

const port = process.env.PORT
app.listen(port, () => {
  console.log(`---------- Server running on port ${port}`)
})
