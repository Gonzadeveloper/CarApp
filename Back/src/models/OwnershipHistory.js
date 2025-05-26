const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OwnershipHistory = sequelize.define('OwnershipHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  car_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  previous_user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  new_user_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, { timestamps: true });


module.exports = OwnershipHistory;