//importación de los modelos y esquemas
const {Admin, AdminSchema} = require('./admin.model');
const {Ticket, TicketSchema} = require('./ticket.model');
const {Pay, PaySchema} = require('./pay.model');
const {Lottery, LotterySchema} = require('./lottery.model');
const {Customer, CustomerSchema} = require('./customer.model');


//recordar el orden de dependencia para no tener problemas con las relaciones
const entities = [
  {schema: AdminSchema, model: Admin},
  {schema: CustomerSchema, model: Customer},
  {schema: LotterySchema, model: Lottery},
  {schema: PaySchema, model: Pay},
  {schema: TicketSchema, model: Ticket}
];

//función para la configuración de sequelize con los modelos
function setupModels(sequelize) {
  //inicialización de los modelos, con su respectivo esquema y configuración
  entities.forEach(item => {
    item.model.init(item.schema, item.model.config(sequelize));
  });

  //ejecución de las asociaciones
  entities.forEach(item => {
    item.model.associate(sequelize.models);
  })


}

module.exports = setupModels;
