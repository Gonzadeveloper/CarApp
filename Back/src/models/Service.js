const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  car_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  km_at_service: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
    year: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
  }
}, { timestamps: true, paranoid: true });

module.exports = Service;
