const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cities = sequelize.define('Cities', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, { timestamps: false });

module.exports = Cities;
