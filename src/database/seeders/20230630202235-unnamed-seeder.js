'use strict';
const { ADMIN_TABLE } = require('../models/admin.model');


const {encryptPassword} = require('../../utils/auth/hash');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(ADMIN_TABLE,[
      {
        email: 'cristianflorez873@gmail.com',
        password:await encryptPassword('primeraPrueba')
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(ADMIN_TABLE, null, {});
  }
};
