const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class PayService {
  constructor(){}

  async create(data) {
    const newPay = await models.Pay.create(data);
    return newPay;
  }

  async createDos(data) {
    const newPay = await models.Pay.bulkCreate(data);
    return newPay;
  }

  async find() {
    const rta = await models.Pay.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Pay.findByPk(id);
    if(!rta) throw boom.notFound('User not found');
    return rta;
  }

  async update(id, changes) {
    const pay = await this.findOne(id);
    const rta = pay.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    user.destroy();
    return {id};
  }
}

module.exports = PayService;