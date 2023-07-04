const express = require('express');
const passport = require('passport');
const router = express.Router();
const {local, recovery, changePassword, signUp} = require('./../controllers/auth.controller');
const validatorHandler = require('./../middlewares/validator.handler');
const {sendRecovery, logIn, resetPass} = require('./../schemas/auth.schema');
const {createAdminSchema} = require('./../schemas/admin.schema');

router.post('/', validatorHandler(logIn, 'body'), passport.authenticate('local', {session: false}), local);
router.post('/recovery', validatorHandler(sendRecovery, 'body'), recovery);
router.post('/sign-up',validatorHandler(createAdminSchema, 'body'), signUp);
//insert validator middleware for the new password
router.post('/change-password', validatorHandler(resetPass, 'body'), changePassword);

module.exports = router;