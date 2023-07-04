const {DataTypes, Model} = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema ={
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  personalId:{
    field:'personal_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}

class Customer extends Model {
  static associate(models) {
    this.hasMany(models.Pay, {
      as: 'pay',
      foreignKey: 'customerId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName:CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}
module.exports = {CUSTOMER_TABLE, CustomerSchema, Customer};