require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes/IndexRoutes");
const sequelize = require("./src/config/db");
require('./src/models')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

sequelize.sync({ force: false })
.then(()=> console.log('Modelos sincronizados con la base de datos.'))
.catch((err) => console.log('Error al soncronizar modelos:', err));