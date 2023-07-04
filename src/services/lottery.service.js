const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class LotteryService { 
  constructor(){}

  async create(data) {
    const newLottery = await models.Lottery.create(data);
    return newLottery;
  }

  async createDos(data) {
    const newLottery = await models.Lottery.bulkCreate(data);
    return newLottery;
  }

  async find() {
    const rta = await models.Lottery.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Lottery.findByPk(id);
    if(!rta) throw boom.notFound('Lottery not found');
    return rta;
  }

  async update(id, changes) {
    const lottery = await this.findOne(id);
    const rta = lottery.update(changes);
    return rta;
  }

  async delete(id) {
    const lottery = await this.findOne(id);
    lottery.destroy();
    return {id};
  }
}

module.exports = LotteryService;