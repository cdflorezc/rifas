const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class AdminService {
  constructor(){}


   //only for auth
   async findOne(id) {
    const rta = await models.Admin.findByPk(id);
    if(!rta) throw boom.notFound('user not found');
    delete rta.dataValues.password;
    return rta;
  }

  //only for auth
  async findFirst(email) {
    const rta = await models.Admin.findOne({where: {email}});
    return rta;
  }


  async create(data) {
    const newAdmin = await models.Admin.create(data);
    return newAdmin;
  }



  async createDos(data) {
    const newAdmin = await models.Admin.bulkCreate(data);
    return newAdmin;
  }

  async find() {
    const rta = await models.Admin.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Admin.findByPk(id);
    if(!rta) throw boom.notFound('Input not found');
    return rta;
  }

  async update(id, changes) {
    const admin = await this.findOne(id);
    const rta = admin.update(changes);
    return rta;
  }

  async delete(id) {
    const admin = await this.findOne(id);
    admin.destroy();
    return {id};
  }
}

module.exports = AdminService;