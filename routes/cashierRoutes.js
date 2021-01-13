/**
 * archivo para las rutas de cajeras
 */

const express = require('express');
const CashierService = require('../services/cashierService');
const validationHandler = require('../utils/middleware/validationHandler');

const {
  cashierIdSchema,
  createCashierSchema,
} = require('../utils/schema/cajeraSchema');

const cashierApi = (app) => {
  const router = express.Router();
  router.use(express.json());
  app.use('/cashier', router);

  const cashierService = new CashierService();

  //rutas
  router.get(
    '/',
    validationHandler({ userId: cashierIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;
      try {
        const cashierData = await cashierService.getData({ userId });
        res.status(200).json({
          data: cashierData,
          message: 'Datos de las cajas',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //crear un nuevo dato
  router.post(
    '/',
    validationHandler(createCashierSchema),
    async function (req, res, next) {
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

      const body = req.body;
      const data = {
        caja: body.caja,
        fecha: body.fecha ? body.fecha : dateServer,
        hora: body.hora ? body.hora : timeServer,
      };
      try {
        const createCashierId = await cashierService.createData({ data });
        res.status(201).json({
          data: createCashierId,
          message: 'Dato creado',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //obtener datos por fechas
  router.post('/report', async function (req, res) {
    const desde = req.body.desde;
    const hasta = req.body.hasta;
    const query = {
      fecha: {
        $gte: desde,
        $lt: hasta,
      },
    };
    try {
      const reportData = await cashierService.getSpecificData(query);

      res.status(201).json({
        data: reportData,
        message: `Datos desde la fecha ${desde} hasta ${hasta}`,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener por fecha',
      });
    }
  });

  router.delete(
    '/:cashierId',
    validationHandler({ cashierId: cashierIdSchema }, 'params'),
    async function (req, res, next) {
      const cashierId = req.params.cashierId;
      try {
        const deletedCashierId = await cashierService.deleteData(cashierId);

        res
          .status(200)
          .json({ data: deletedCashierId, message: 'Dato borrado' });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = cashierApi;
