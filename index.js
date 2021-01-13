// entrada de la app

const express = require('express');
const app = express();
const { config } = require('./config/config');
const cashierApi = require('./routes/cashierRoutes');

//parser
app.use(express.json());

//usar las rutas de la cajera
cashierApi(app);

app.get('/', (req, res) => {
  res.json(
    'Por favor ve a : /cashier , para los resportes ve a /cashier/report'
  );
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(new Error('No se pudo levantar el servidor'));
  }
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
