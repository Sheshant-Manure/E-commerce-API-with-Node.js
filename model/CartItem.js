const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations if needed
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
};

CartItem.sync()
  .then(() => {
    console.log('CartItem table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating CartItem table:', error);
  });

module.exports = CartItem;
