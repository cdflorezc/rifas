const AdminRouter = require('./admin.router');
const CustomerRouter = require('./customer.router');
const LotteryRouter = require('./lottery.router');
const PayRouter = require('./pay.router');
const TicketRouter = require('./ticket.router');
const AuthRouter = require('./auth.router');


function routerApi(app) {
  app.use('/admin', AdminRouter);
  app.use('/customet', CustomerRouter);
  app.use('/lottery', LotteryRouter);
  app.use('/pay', PayRouter);
  app.use('/ticket', TicketRouter);
  app.use('/auth', AuthRouter);
}

module.exports = routerApi; 