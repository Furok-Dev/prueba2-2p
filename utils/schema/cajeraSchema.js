/** creacion del esquema para introduccion de los datos  */

const joi = require('joi');

// hora y fecha del SERVIDOR

let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hour = date.getHours();
let min = date.getMinutes();
let seg = date.getSeconds();
let dateServer = '';
let timeServer = `${hour}:${min}:${seg}`;
if (month < 10) {
  dateServer = `${day}-0${month}-${year}`;
} else {
  dateServer = `${day}-${month}-${year}`;
}

//esquema de datos
const cashierIdSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createCashierSchema = {
  numeroCajaSchema: joi.string().required(),
  date: joi.string().default(dateServer),
  time: joi.string().default(timeServer),
};

module.exports = { cashierIdSchema, createCashierSchema };
