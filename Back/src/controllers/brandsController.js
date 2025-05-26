const { Brands } = require('../models');
const { notFoundResponse, successResponse, errorResponse } = require('../utils/responseHelpers');

// Obtener todas las marcas
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.findAll();
    successResponse(res, 'exito al traer las marcas', brands);
  } catch (error) {
    errorResponse(res, 'Error al obtener las marcas.', err.message)
  }
};

// Obtener una marca por ID
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brands.findByPk(id);
    if (!brand) return notFoundResponse(res, 'Marca' );
    successResponse(res, 'Marca encontrada', brand)
  } catch (error) {
    errorResponse(res,'Error al obtener la marca.', error.message);
  }
};

//Crear una nueva marca
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const newBrand = await Brands.create({ name });
    return res.status(201).json({ msg: 'Marca creada con éxito.', data: newBrand });
  } catch (error) {
    return errorResponse(res, 'Error al crear la marca.', error.message);
  }
};

// Actualizar una marca
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Brands.update(req.body, { where: { id } });
    if (!updated) return notFoundResponse(res, 'Marca no encontrada.');

    const updatedBrand = await Brands.findByPk(id);
    return successResponse(res, 'Marca actualizada con éxito.', updatedBrand);
  } catch (error) {
    return errorResponse(res, 'Error al actualizar la marca.', error.message);
  }
};

// Eliminar una marca
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Brands.destroy({ where: { id } });
    if (!deleted) return notFoundResponse(res, 'Marca no encontrada.');

    return successResponse(res, 'Marca eliminada correctamente.');
  } catch (error) {
    return errorResponse(res, 'Error al eliminar la marca.', error.message);
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
