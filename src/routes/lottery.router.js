const express = require('express');
const router = express.Router();
const LotteryService = require('../services/lottery.service');
//const {createlotterySchema, getlotterySchema, updatelotterySchema} = require('../schemas/lottery.schema');
const validatorHandler= require("../middlewares/validator.handler")
const service = new LotteryService();


router.post('/', async (req, res, next) => {
  try {
    const lottery = await service.create(req.body);
    res.json(lottery);
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
    const lottery = await service.createDos(arr);
    res.json(lottery);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',  async (req, res, next) => {
  try {
    const lottery = await service.update(req.params.id, req.body);
    res.json(lottery);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',  async (req, res, next) => {
  try {
    const lottery = await service.delete(req.params.id);
    res.json(lottery);
  } catch (error) {
    next(error);
  }
});

module.exports = router;