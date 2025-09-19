const { Users, Cities } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// Obtener usuario autenticado
const getMe = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id, {
      attributes: ['name', 'lastName', 'email', 'dni', 'id'],
      include: [{ model: Cities, attributes: ['name'] }]
    });
    if (!user) return notFoundResponse(res, 'Usuario');
    successResponse(res, 'Usuario obtenido correctamente', user);
  } catch (err) {
    errorResponse(res, 'Error al obtener el usuario', err.message, 500);
  }
};

// Refrescar token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return errorResponse(res, 'No se recibió ningún refresh token', null, 400);
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(payload.id);
    successResponse(res, 'Token refrescado correctamente', { accessToken: newAccessToken });
  } catch (err) {
    errorResponse(res, 'Refresh token inválido', err.message, 401);
  }
};

// Registrar usuario
const registerUser = async (req, res) => {
  const { password, email, name, lastName } = req.body;
  try {

    
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({ name, lastName, email, password_hash: hash });
    
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    
    const data = {
      id: user.id,
		  email: user.id,
      accessToken,
		  refreshToken
    }

    successResponse(res, 'Usuario registrado correctamente', data, 201);
  } catch (err) {
    errorResponse(res, 'Error al registrar el usuario', err.message, 400);
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return notFoundResponse(res, 'Usuario');

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return errorResponse(res, 'Contraseña incorrecta', null, 401);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Extraer solo los campos que queremos enviar
    const data = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      dni: user.dni,
      accessToken,
      refreshToken,
    };

    successResponse(res, 'Login exitoso', data);
  } catch (err) {
    errorResponse(res, 'Error al iniciar sesión', err.message, 500);
  }
};


// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{ model: Cities }]
    });
    successResponse(res, 'Usuarios obtenidos correctamente', users);
  } catch (err) {
    errorResponse(res, 'Error al obtener los usuarios', err.message, 500);
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return notFoundResponse(res, 'Usuario');
    successResponse(res, 'Usuario obtenido correctamente', user);
  } catch (err) {
    errorResponse(res, 'Error al obtener el usuario', err.message, 500);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return notFoundResponse(res, 'Usuario');
    await user.update(req.body);
    successResponse(res, 'Usuario actualizado correctamente', user);
  } catch (err) {
    errorResponse(res, 'Error al actualizar el usuario', err.message, 500);
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return notFoundResponse(res, 'Usuario');
    await user.destroy();
    successResponse(res, 'Usuario eliminado correctamente');
  } catch (err) {
    errorResponse(res, 'Error al eliminar el usuario', err.message, 500);
  }
};

module.exports = {
  getMe,
  refreshToken,
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
