const Users = require('./Users');
const Cities = require('./Cities');
const Provinces = require('./Provinces');
const Models = require('./Models');
const Brands = require('./Brands');
const Versions = require('./Versions');
const Cars = require('./Cars');
const CarKm = require('./CarKm');
const Service = require('./Service');
const OwnershipHistory  = require('./OwnershipHistory')

// Provinces → Cities
Provinces.hasMany(Cities, { foreignKey: 'province_id' });
Cities.belongsTo(Provinces, { foreignKey: 'province_id' });

// Cities → Users
Cities.hasMany(Users, { foreignKey: 'city_id' });
Users.belongsTo(Cities, { foreignKey: 'city_id' });

// Brands → Models
Brands.hasMany(Models, { foreignKey: 'brand_id' });
Models.belongsTo(Brands, { foreignKey: 'brand_id' });

// Models → Versions
Models.hasMany(Versions, { foreignKey: 'model_id' });
Versions.belongsTo(Models, { foreignKey: 'model_id' });

// Versions → Cars
Versions.hasMany(Cars, { foreignKey: 'version_id' });
Cars.belongsTo(Versions, { foreignKey: 'version_id' });

// Users → Cars
Users.hasMany(Cars, { foreignKey: 'user_id' });
Cars.belongsTo(Users, { foreignKey: 'user_id' });

//Cars → CarKm
Cars.hasMany(CarKm, { foreignKey: 'car_id' });
CarKm.belongsTo(Cars, { foreignKey: 'car_id' });

//Cars → Service
Cars.hasMany(Service, { foreignKey: 'car_id' });
Service.belongsTo(Cars, { foreignKey: 'car_id' });

// Un historial pertenece a un auto
OwnershipHistory.belongsTo(Cars, { foreignKey: 'car_id' });

// Podés también asociar con el modelo de usuarios (si tenés uno)
OwnershipHistory.belongsTo(Users, { foreignKey: 'previous_user_id', as: 'previousOwner' });
OwnershipHistory.belongsTo(Users, { foreignKey: 'new_user_id', as: 'newOwner' });

// Y si querés desde el modelo `Cars` ver todos los dueños anteriores
Cars.hasMany(OwnershipHistory, { foreignKey: 'car_id' });


module.exports = {
    Users,
    Cities,
    Provinces,
    Models,
    Brands,
    Versions,
    Cars,
    CarKm,
    Service,
    OwnershipHistory
}