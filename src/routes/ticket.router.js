const express = require('express');
const router = express.Router();
const TicketService = require('../services/ticket.service');
//const {createlotterySchema, getlotterySchema, updatelotterySchema} = require('../schemas/lottery.schema');
const validatorHandler= require("../middlewares/validator.handler")
const service = new TicketService();


router.post('/', async (req, res, next) => {
  try {
    const ticket = await service.create(req.body);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.post('/bulk', async (req, res, next) => {
  try {
    const arr=[]
    for(const item of req.body){
      arr.push(item)
    }
    const ticket = await service.createDos(arr);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',  async (req, res, next) => {
  try {
    const ticket = await service.update(req.params.id, req.body);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',  async (req, res, next) => {
  try {
    const ticket = await service.delete(req.params.id);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

module.exports = router;