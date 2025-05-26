const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brands = sequelize.define('Brands', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

module.exports = Brands;
