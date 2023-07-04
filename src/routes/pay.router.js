const express = require('express');
const router = express.Router();
const PayService = require('../services/pay.service');
//const {createlotterySchema, getlotterySchema, updatelotterySchema} = require('../schemas/lottery.schema');
const validatorHandler= require("../middlewares/validator.handler")
const service = new PayService();


router.post('/', async (req, res, next) => {
  try {
    const pay = await service.create(req.body);
    res.json(pay);
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
    const pay = await service.createDos(arr);
    res.json(pay);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',  async (req, res, next) => {
  try {
    const pay = await service.update(req.params.id, req.body);
    res.json(pay);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',  async (req, res, next) => {
  try {
    const pay = await service.delete(req.params.id);
    res.json(pay);
  } catch (error) {
    next(error);
  }
});

module.exports = router;