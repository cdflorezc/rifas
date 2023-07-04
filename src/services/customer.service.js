const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CustomerService {
  constructor(){}

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async createDos(data) {
    const newCustomer = await models.Customer.bulkCreate(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Customer.findByPk(id);
    if(!rta) throw boom.notFound('Raffle not found');
    return rta;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return {id};
  }
}

module.exports = CustomerService;