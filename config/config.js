/**
 * Archivo de configuracion general
 * para las variables de entorno
 */

require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};

module.exports = { config };
