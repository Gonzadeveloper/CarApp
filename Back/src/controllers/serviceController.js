const { Service } = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Crear un nuevo servicio
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    successResponse(res, 'Servicio creado correctamente', service, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear el servicio', error.message, 400);
  }
};

// Obtener todos los servicios por car_id
const getServicesByCarId = async (req, res) => {
  try {
    const services = await Service.findAll({ where: { car_id: req.params.carId } });
    successResponse(res, 'Servicios obtenidos correctamente', services);
  } catch (error) {
    errorResponse(res, 'Error al obtener los servicios', error.message, 400);
  }
};

// Actualizar un servicio
const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return notFoundResponse(res, 'Servicio');

    await service.update(req.body);
    successResponse(res, 'Servicio actualizado correctamente', service);
  } catch (error) {
    errorResponse(res, 'Error al actualizar el servicio', error.message, 400);
  }
};

// Eliminar un servicio
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return notFoundResponse(res, 'Servicio');

    await service.destroy();
    successResponse(res, 'Servicio eliminado correctamente');
  } catch (error) {
    errorResponse(res, 'Error al eliminar el servicio', error.message, 400);
  }
};

module.exports = {
  createService,
  getServicesByCarId,
  updateService,
  deleteService
};
