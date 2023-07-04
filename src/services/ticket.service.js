const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class TicketService { 
  constructor(){}

  async create(data) {
    const newTicket = await models.Ticket.create(data);
    return newTicket;
  }

  async createDos(data) {
    const newTicket = await models.Ticket.bulkCreate(data);
    return newTicket;
  }

  async find() {
    const rta = await models.Ticket.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Ticket.findByPk(id);
    if(!rta) throw boom.notFound('Lottery not found');
    return rta;
  }

  async update(id, changes) {
    const ticket = await this.findOne(id);
    const rta = ticket.update(changes);
    return rta;
  }

  async delete(id) {
    const ticket = await this.findOne(id);
    ticket.destroy();
    return {id};
  }
}

module.exports = TicketService;