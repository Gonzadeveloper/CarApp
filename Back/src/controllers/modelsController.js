const { Models } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Obtener todos los modelos
const getAllModels = async (req, res) => {
  try {
    const models = await Models.findAll();
    successResponse(res, 'Modelos obtenidos correctamente', models);
  } catch (error) {
    errorResponse(res, 'Error al obtener los modelos', error.message, 500);
  }
};

// Obtener un modelo por ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Models.findByPk(id);
    if (!model) return notFoundResponse(res, 'Modelo');
    successResponse(res, 'Modelo obtenido correctamente', model);
  } catch (error) {
    errorResponse(res, 'Error al obtener el modelo', error.message, 500);
  }
};

// Crear un modelo nuevo
const createModel = async (req, res) => {
  try {
    const { name, brand_id } = req.body;
    const newModel = await Models.create({ name, brand_id });
    successResponse(res, 'Modelo creado correctamente', newModel, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear el modelo', error.message, 500);
  }
};

// Actualizar un modelo existente
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Models.update(req.body, { where: { id } });
    if (!updated) return notFoundResponse(res, 'Modelo');

    const updatedModel = await Models.findByPk(id);
    successResponse(res, 'Modelo actualizado correctamente', updatedModel);
  } catch (error) {
    errorResponse(res, 'Error al actualizar el modelo', error.message, 500);
  }
};

// Eliminar un modelo
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Models.destroy({ where: { id } });
    if (!deleted) return notFoundResponse(res, 'Modelo');

    successResponse(res, 'Modelo eliminado correctamente');
  } catch (error) {
    errorResponse(res, 'Error al eliminar el modelo', error.message, 500);
  }
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel
};
