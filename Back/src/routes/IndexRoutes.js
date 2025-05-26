const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
    getMe,
    refreshToken,
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');
const {
    createCity,
    getCities,
    getCityById,
    updateCity,
    deleteCity
} = require('../controllers/citiesController');
const {
    getMyCars,
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/carsController');
const {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../controllers/brandsController');
const {
    getAllModels,
    getModelById,
    createModel,
    updateModel,
    deleteModel
} = require('../controllers/modelsController');
const {
    getAllProvinces,
    getProvinceById,
    createProvince,
    updateProvince,
    deleteProvince
} = require('../controllers/provincesController');
const {
    getAllVersions,
    getVersionById,
    createVersion,
    updateVersion,
    deleteVersion
} = require('../controllers/versionsController');
const {
  createKms,
  getKmsByCarId,
  updateKms,
  deleteKms
} = require('../controllers/kmsController');
const {
  createService,
  getServicesByCarId,
  updateService,
  deleteService
} = require('../controllers/serviceController');


router.get('/users/me', authenticateToken, getMe);
router.post('/users/refresh-token', refreshToken);
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/cities', createCity);
router.get('/cities', getCities);
router.get('/cities/:id', getCityById);
router.put('/cities/:id', updateCity);
router.delete('/cities/:id', deleteCity);

router.get('/cars/getmycar', authenticateToken, getMyCars)
router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars/', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

router.get('/brands', getAllBrands);
router.get('/brands/:id', getBrandById);
router.post('/brands/', createBrand);
router.put('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

router.get('/model', getAllModels);
router.get('/model/:id', getModelById);
router.post('/model/', createModel);
router.put('/model/:id', updateModel);
router.delete('/model/:id', deleteModel);

router.get('/provinces', getAllProvinces);
router.get('/provinces/:id', getProvinceById);
router.post('/provinces/', createProvince);
router.put('/provinces/:id', updateProvince);
router.delete('/provinces/:id', deleteProvince);

router.get('/versions', getAllVersions);
router.get('/versions/:id', getVersionById);
router.post('/versions/', createVersion);
router.put('/versions/:id', updateVersion);
router.delete('/versions/:id', deleteVersion);

router.post('/kms', createKms);
router.get('/kms/:carId', getKmsByCarId);
router.put('/kms:id', updateKms);
router.delete('/kms/:id', deleteKms);

router.post('/service', createService);
router.get('/service/:carId', getServicesByCarId);
router.put('/service/:id', updateService);
router.delete('/service/:id', deleteService);

module.exports = router;
