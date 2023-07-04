const express = require('express');
const passport = require('passport'); 
const router = express.Router();
const AdminService = require('../services/admin.service');
//const {createinputSchema, getinputSchema, updateinputSchema} = require('../schemas/input.schema');
const validatorHandler= require("../middlewares/validator.handler")
const service = new AdminService();


router.get('/',passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const search = await filterSearch(req.query)
    res.json(search);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const detail = await service.findOne(req.params.id);
    res.json(detail);
  } catch (error) {
    next(error);
  }
});

router.post('/',async (req, res, next) => {
  try {
    const admin = await service.create(req.body);
    res.json(admin);
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
    const admin = await service.createDos(arr);
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',passport.authenticate('jwt', {session: false}),  async (req, res, next) => {
  try {
    const admin = await service.update(req.params.id, req.body);
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const admin = await service.delete(req.params.id);
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;