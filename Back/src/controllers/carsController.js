const { Cars, Service, CarKm, Versions, Models, Brands} = require('../models');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHelpers');

// Obtener todos los autos
const getAllCars = async (req, res) => {
  try {
    const cars = await Cars.findAll();
    successResponse(res, 'Autos obtenidos con éxito', cars);
  } catch (error) {
    errorResponse(res, 'Error al obtener los autos', error.message);
  }
};

// Obtener todos mis autos
const getMyCars = async (req, res) => {
  try {
    const userId = req.user.id; // asumimos que ya tenés un middleware que mete user en req

    const cars = await Cars.findAll({
      where: { user_id: userId },
      attributes: ['id', 'license_plate', 'year', 'next_service'],
      include: [
        {
          model: Service,
          attributes: ['description', 'km_at_service', 'createdAt']
        },
        {
          model: CarKm,
          attributes: ['km', 'createdAt']
        },
        {
          model: Versions,
          attributes: ['name'],
          include: [
            {
              model: Models,
              attributes: ['name'],
              include: [
                {
                  model: Brands,
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    });

    successResponse(res, 'Datos de los autos obtenidos', cars, 200);
  } catch (error) {
    errorResponse(res, 'Error al obtener los datos de los autos', error.message);
  }
};


// Obtener auto por ID
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Cars.findByPk(id, {
      attributes: [ 'id', 'license_plate'],
      include: [
        { 
          model: Service, attributes: [ 'description', 'km_at_service']
        },
        {
          model: CarKm, attributes: [ 'km', 'createdAt']
        },
        {
          model: Versions,
          attributes: ['name'],
          include: [
            {
              model: Models,
              attributes: ['name'],
              include: [
                {
                  model: Brands,
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    }); 

    if (!car) return notFoundResponse(res, 'Auto');

    successResponse(res, 'Auto encontrado con éxito', car);
  } catch (error) {
    errorResponse(res, 'Error al buscar el auto', error.message);
  }
};

// Crear un nuevo auto
const createCar = async (req, res) => {
  try {
    const newCar = await Cars.create(req.body);
    successResponse(res, 'Auto creado con éxito', newCar, 201);
  } catch (error) {
    errorResponse(res, 'Error al crear el auto', error.message);
  }
};

// Actualizar un auto
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Cars.update(req.body, { where: { id } });

    if (!updated) return notFoundResponse(res, 'Auto');

    const updatedCar = await Cars.findByPk(id);
    successResponse(res, 'Auto actualizado con éxito', updatedCar);
  } catch (error) {
    errorResponse(res, 'Error al actualizar el auto', error.message);
  }
};

// Eliminar un auto
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cars.destroy({ where: { id } });

    if (!deleted) return notFoundResponse(res, 'Auto');

    successResponse(res, 'Auto eliminado con éxito');
  } catch (error) {
    errorResponse(res, 'Error al eliminar el auto', error.message);
  }
};

module.exports = {
  getMyCars,
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};
