/**
 * El corazon de la app , ya que aqui esta toda la logica
 * que puede hacer la app
 */

// Base de datos
const MongoDB = require('../database/mongoDB');

//servicio de la cajera
class CashierService {
  constructor() {
    this.collection = 'cajas';
    this.mongoDB = new MongoDB();
  }

  async getData({ id }) {
    let userData = await this.mongoDB.getAll(this.collection, { id });
    return userData;
  }

  async createData({ data }) {
    const newCashierId = await this.mongoDB.create(this.collection, data);
    return newCashierId;
  }

  async deleteData({ dataId }) {
    const deletedDataId = await this.mongoDB.delete(this.collection, dataId);
    return deletedDataId;
  }
}

module.exports = CashierService;
