const { CarKm } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// CREATE
const createKms = async (req, res) => {
  try {
    const kms = await CarKm.create(req.body);
    successResponse(res, 'Registro de KMs creado con éxito', kms, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear el registro de KMs', error.message);
  }
};

// READ all by car_id
const getKmsByCarId = async (req, res) => {
  try {
    const kms = await CarKm.findAll({ where: { car_id: req.params.carId } });
    successResponse(res, 'Registros de KMs obtenidos con éxito', kms);
  } catch (error) {
    errorResponse(res, 'Error al obtener los registros de KMs', error.message);
  }
};

// UPDATE
const updateKms = async (req, res) => {
  try {
    const km = await CarKm.findByPk(req.params.id);
    if (!km) return notFoundResponse(res, 'Registro de KMs');

    await km.update(req.body);
    successResponse(res, 'Registro de KMs actualizado con éxito', km);
  } catch (error) {
    errorResponse(res, 'Error al actualizar el registro de KMs', error.message);
  }
};

// DELETE
const deleteKms = async (req, res) => {
  try {
    const km = await CarKm.findByPk(req.params.id);
    if (!km) return notFoundResponse(res, 'Registro de KMs');

    await km.destroy();
    successResponse(res, 'Registro de KMs eliminado con éxito');
  } catch (error) {
    errorResponse(res, 'Error al eliminar el registro de KMs', error.message);
  }
};

module.exports = {
  createKms,
  getKmsByCarId,
  updateKms,
  deleteKms
};
