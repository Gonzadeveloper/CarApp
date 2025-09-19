const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Users = sequelize.define('Users', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [7, 10], 
          isNumeric: true
        }
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
}, { timestamps: true });

module.exports = Users;