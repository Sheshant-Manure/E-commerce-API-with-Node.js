const { Sequelize } = require('sequelize');
require('dotenv').config();
const databaseUrl = process.env.DB_URL

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // set to false if SSL certificate is not provided
    },
  },
});

module.exports = sequelize;
