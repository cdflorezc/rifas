const {DataTypes, Model} = require('sequelize');


const LOTTERY_TABLE = 'lotteries';

const LotterySchema ={
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true

  },
  award:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticketPrice:{
    field:'ticket_price',
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  creationDate:{
    field:'creation_date',
    type: DataTypes.DATE,
    allowNull: false
  },
  finishDate:{
    field:'finish_date',
    type: DataTypes.DATE,
  },
  img:{
    type: DataTypes.STRING,
    allowNull: false
  },
  winner:{
    type: DataTypes.INTEGER
  }
}

class Lottery extends Model {
  static associate(models) {
    this.belongsTo(models.Ticket, {as: 'ticket'});
  
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LOTTERY_TABLE,
      modelName: 'Lottery',
      timestamps: false
    }
  }
}
module.exports = {LOTTERY_TABLE, LotterySchema, Lottery};