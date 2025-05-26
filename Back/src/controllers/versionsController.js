const { Versions } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Obtener todas las versiones
const getAllVersions = async (req, res) => {
  try {
    const versions = await Versions.findAll();
    successResponse(res, 'Versiones obtenidas correctamente', versions);
  } catch (error) {
    errorResponse(res, 'Error al obtener las versiones', error.message, 500);
  }
};

// Obtener una versión por ID
const getVersionById = async (req, res) => {
  try {
    const { id } = req.params;
    const version = await Versions.findByPk(id);
    if (!version) return notFoundResponse(res, 'Versión');
    successResponse(res, 'Versión obtenida correctamente', version);
  } catch (error) {
    errorResponse(res, 'Error al obtener la versión', error.message, 500);
  }
};

// Crear una nueva versión
const createVersion = async (req, res) => {
  try {
    const { name, model_id, year } = req.body;
    const newVersion = await Versions.create({ name, model_id, year });
    successResponse(res, 'Versión creada correctamente', newVersion, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear la versión', error.message, 500);
  }
};

// Actualizar una versión
const updateVersion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Versions.update(req.body, { where: { id } });
    if (!updated) return notFoundResponse(res, 'Versión');
    const updatedVersion = await Versions.findByPk(id);
    successResponse(res, 'Versión actualizada correctamente', updatedVersion);
  } catch (error) {
    errorResponse(res, 'Error al actualizar la versión', error.message, 500);
  }
};

// Eliminar una versión
const deleteVersion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Versions.destroy({ where: { id } });
    if (!deleted) return notFoundResponse(res, 'Versión');
    successResponse(res, 'Versión eliminada correctamente');
  } catch (error) {
    errorResponse(res, 'Error al eliminar la versión', error.message, 500);
  }
};

module.exports = {
  getAllVersions,
  getVersionById,
  createVersion,
  updateVersion,
  deleteVersion
};
