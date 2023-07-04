'use strict';
const { AdminSchema,ADMIN_TABLE } = require('../models/admin.model');

const { CustomerSchema,CUSTOMER_TABLE } = require('../models/customer.model');

const { LotterySchema,LOTTERY_TABLE } = require('../models/lottery.model');

const { PaySchema,PAY_TABLE } = require('../models/pay.model');

const { TicketSchema,TICKET_TABLE } = require('../models/ticket.model');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ADMIN_TABLE, AdminSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(LOTTERY_TABLE, LotterySchema);
    await queryInterface.createTable(PAY_TABLE, PaySchema);
    await queryInterface.createTable(TICKET_TABLE, TicketSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TICKET_TABLE);
    await queryInterface.dropTable(PAY_TABLE);
    await queryInterface.dropTable(LOTTERY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ADMIN_TABLE);
  }
};
