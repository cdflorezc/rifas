const {DataTypes, Model} = require('sequelize');
const {CUSTOMER_TABLE} = require('../models/customer.model');

const PAY_TABLE = 'payments';

const PaySchema ={
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  payReference:{
    fiel: 'pay_reference',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customerId: {
    field: 'customer_id', 
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  ammount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  payDate: {
    field: 'pay_date',
    type: DataTypes.STRING,
    allowNull: false
  }
}

class Pay extends Model {
  static associate(models) {
    this.hasMany(models.Ticket, {
      as: 'ticket',
      foreignKey: 'customerId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName:PAY_TABLE,
      modelName: 'Pay',
      timestamps: false
    }
  }
}
module.exports = {PAY_TABLE, PaySchema, Pay};