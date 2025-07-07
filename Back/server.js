const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ force: false })
    .then(() => console.log("Modelos sincronizados con la base de datos."))
    .catch((err) => console.log("Error al sincronizar modelos:", err));

module.exports = { app, server };