const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarKm = sequelize.define('CarKm', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  car_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  km: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
    year: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
  }
}, { timestamps: true, paranoid: true });

module.exports = CarKm;
