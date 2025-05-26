const { Provinces } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Obtener todas las provincias
const getAllProvinces = async (req, res) => {
  try {
    const provinces = await Provinces.findAll();
    successResponse(res, 'Provincias obtenidas correctamente', provinces);
  } catch (error) {
    errorResponse(res, 'Error al obtener las provincias', error.message, 500);
  }
};

// Obtener una provincia por ID
const getProvinceById = async (req, res) => {
  try {
    const { id } = req.params;
    const province = await Provinces.findByPk(id);
    if (!province) return notFoundResponse(res, 'Provincia');
    successResponse(res, 'Provincia obtenida correctamente', province);
  } catch (error) {
    errorResponse(res, 'Error al obtener la provincia', error.message, 500);
  }
};

// Crear una nueva provincia
const createProvince = async (req, res) => {
  try {
    const { name } = req.body;
    const newProvince = await Provinces.create({ name });
    successResponse(res, 'Provincia creada correctamente', newProvince, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear la provincia', error.message, 500);
  }
};

// Actualizar una provincia
const updateProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Provinces.update(req.body, { where: { id } });
    if (!updated) return notFoundResponse(res, 'Provincia');
    const updatedProvince = await Provinces.findByPk(id);
    successResponse(res, 'Provincia actualizada correctamente', updatedProvince);
  } catch (error) {
    errorResponse(res, 'Error al actualizar la provincia', error.message, 500);
  }
};

// Eliminar una provincia
const deleteProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Provinces.destroy({ where: { id } });
    if (!deleted) return notFoundResponse(res, 'Provincia');
    successResponse(res, 'Provincia eliminada correctamente');
  } catch (error) {
    errorResponse(res, 'Error al eliminar la provincia', error.message, 500);
  }
};

module.exports = {
  getAllProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince
};
