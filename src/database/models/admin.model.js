const {DataTypes, Model} = require('sequelize');

const ADMIN_TABLE = 'admins';

const AdminSchema ={
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recoveryToken: {
    field: 'recovery_token',
    type: DataTypes.STRING,
  }
}

class Admin extends Model {
  static associate(models) {
    
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName:ADMIN_TABLE,
      modelName: 'Admin',
      timestamps: false,
    }
  }
}
module.exports = {ADMIN_TABLE, AdminSchema, Admin};