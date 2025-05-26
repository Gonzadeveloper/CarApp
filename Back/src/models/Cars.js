const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cars = sequelize.define('Cars', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  license_plate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true, // o false si es obligatorio
  },
  next_service: {
    type: DataTypes.DATEONLY, // solo fecha (sin hora)
    allowNull: true,
  },
  locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: true, paranoid: true }); // Soft delete habilitado

module.exports = Cars;
