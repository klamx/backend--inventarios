const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('railway', 'postgres', '8QeYMJejTfLRvbwiO6js', {
  host: 'containers.railway.app',
  dialect: 'postgres',
  ssl: true,
  port: 7233,
})

module.exports = { sequelize }
