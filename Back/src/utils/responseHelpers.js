const successResponse = (res, msg, data = null, statusCode = 200) => {
  res.status(statusCode).json({ msg, data });
};

// Helper para respuestas con error
const errorResponse = (res, msg, error = null, statusCode = 400) => {
  res.status(statusCode).json({ msg, error });
};

// 🛑 Para errores de validación, como campos faltantes o inválidos
const validationResponse = (res, errors) => {
  return res.status(400).json({
    msg: "Datos inválidos",
    errors: Array.isArray(errors) ? errors : [errors],
  });
};

const notFoundResponse = (res, entityName = "Recurso") => {
  return res.status(404).json({
    msg: `${entityName} no encontrado/a`,
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationResponse,
  notFoundResponse,
};
