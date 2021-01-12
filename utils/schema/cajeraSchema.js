/** creacion del esquema para introduccion de los datos  */

const joi = require('joi');

//esquema de datos
const cashierIdSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createCashierSchema = {
  caja: joi.string().required(),
  fecha: joi.string(),
  hora: joi.string(),
};

module.exports = { cashierIdSchema, createCashierSchema };
