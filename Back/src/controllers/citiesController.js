const { Cities } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Crear ciudad
const createCity = async (req, res) => {
  try {
    const { name, province_id } = req.body;
    const city = await Cities.create({ name, province_id });
    successResponse(res, 'Ciudad creada con éxito', city, 201);
  } catch (err) {
    errorResponse(res, 'Error al crear la ciudad', err.message);
  }
};

// Obtener todas las ciudades
const getCities = async (req, res) => {
  try {
    const cities = await Cities.findAll();
    successResponse(res, 'Ciudades obtenidas con éxito', cities);
  } catch (err) {
    errorResponse(res, 'Error al obtener las ciudades', err.message);
  }
};

// Obtener ciudad por ID
const getCityById = async (req, res) => {
  try {
    const city = await Cities.findByPk(req.params.id);
    if (!city) return notFoundResponse(res, 'Ciudad');
    successResponse(res, 'Ciudad obtenida con éxito', city);
  } catch (err) {
    errorResponse(res, 'Error al obtener la ciudad', err.message);
  }
};

// Actualizar ciudad
const updateCity = async (req, res) => {
  try {
    const city = await Cities.findByPk(req.params.id);
    if (!city) return notFoundResponse(res, 'Ciudad');

    await city.update(req.body);
    successResponse(res, 'Ciudad actualizada con éxito', city);
  } catch (err) {
    errorResponse(res, 'Error al actualizar la ciudad', err.message);
  }
};

// Eliminar ciudad
const deleteCity = async (req, res) => {
  try {
    const city = await Cities.findByPk(req.params.id);
    if (!city) return notFoundResponse(res, 'Ciudad');

    await city.destroy();
    successResponse(res, 'Ciudad eliminada con éxito');
  } catch (err) {
    errorResponse(res, 'Error al eliminar la ciudad', err.message);
  }
};

module.exports = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};
