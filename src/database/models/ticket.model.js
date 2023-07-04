const {DataTypes, Model} = require('sequelize');
const {LOTTERY_TABLE} = require('../models/lottery.model');
const {PAY_TABLE} = require('../models/pay.model');

const TICKET_TABLE = 'tickets';

const TicketSchema ={
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true

  },
  lotteryId: {
    field: 'lottery_id',
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: LOTTERY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  payId: {
    field: 'pay_id',
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PAY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

class Ticket extends Model {
  static associate(models) {
    this.belongsTo(models.Lottery, {as: 'lottery'});
    this.belongsTo(models.Pay, {as: 'pay'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TICKET_TABLE,
      modelName: 'Ticket',
      timestamps: false
    }
  }
}
module.exports = {TICKET_TABLE, TicketSchema, Ticket};