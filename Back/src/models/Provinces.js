const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Provinces = sequelize.define('Provinces', {
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

module.exports = Provinces;
