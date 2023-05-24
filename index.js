const express = require('express')
require('dotenv').config()

const app = express()

// directorio público
app.use(express.static('public'))
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))



const port = process.env.PORT
app.listen(port, () => {
  console.log(`---------- Server running on port ${port}`)
})
