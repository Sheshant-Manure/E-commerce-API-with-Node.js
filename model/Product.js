const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

// Establish a foreign key relationship with the Category model
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Product.sync()
    .then(() => {
        console.log('Category table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating Category table:', error);
  });
  
module.exports = Product;