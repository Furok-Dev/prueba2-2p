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

  router.post(
    '/',
    validationHandler(createCashierSchema),
    async function (req, res, next) {
      const { body: data } = req;
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

  router.delete(
    '/:cashierId',
    validationHandler({ cashierId: cashierIdSchema }, 'params'),
    async function (req, res, next) {
      const { cashierId } = req.params;
      try {
        const deletedCashierId = await cashierService.deleteData({ cashierId });

        res
          .status(200)
          .json({ data: deletedCashierId, message: 'Dato borrado' });
      } catch (error) {
        next(error);
      }
    }
  );
};
