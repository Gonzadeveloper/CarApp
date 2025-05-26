const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Models = sequelize.define('Models', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, { timestamps: false });

module.exports = Models;
