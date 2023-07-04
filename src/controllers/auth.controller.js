const AuthService = require('./../services/auth.service');
const service = new AuthService();

const local = async (req, res, next) => {
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
}

const signUp = async (req, res, next) => {
  try {
    await service.signUp(req.body);
    res.json({message: 'successful'})
  } catch (error) {
    next(error);
  }
}

const recovery = async (req, res, next) => {
  try {
    const {email} = req.body;
    const rta = await service.sendRecovery(email);
    res.json({message: rta});
  } catch (error) {
    next(error);
  }
}

const changePassword = async (req, res, next) => {
  try {
    const {token, password} = req.body;
    const rta = await service.changePassword(token, password);
    res.json(rta);
  } catch (error) {
    next(error);
  }
}

module.exports = {local, recovery, changePassword, signUp};