const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customer.service');
//const {createlotterySchema, getlotterySchema, updatelotterySchema} = require('../schemas/lottery.schema');
const validatorHandler= require("../middlewares/validator.handler")
const service = new CustomerService();


router.post('/', async (req, res, next) => {
  try {
    const customer = await service.create(req.body);
    res.json(customer);
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
    const customer = await service.createDos(arr);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',  async (req, res, next) => {
  try {
    const customer = await service.update(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',  async (req, res, next) => {
  try {
    const customer = await service.delete(req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;