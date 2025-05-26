const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Versions = sequelize.define('Versions', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false });

module.exports = Versions;
