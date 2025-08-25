const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('parkir', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ Error: ' + err));

module.exports = sequelize;
