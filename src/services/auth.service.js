const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {comparePassword, encryptPassword} = require('./../utils/auth/hash');
const nodemailer = require('nodemailer');
const {config} = require('./../config/config');
const AdminService = require('./admin.service');
const adminService = new AdminService();

class AuthService {

  constructor(){

  }

  async getUser(email, password) {
    const user = await adminService.findFirst(email);
    if(!user) throw boom.unauthorized();
    const isMatch = await comparePassword(password, user.password);
    if(!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async signUp(data) {
    data.rol = "new";
    console.log(data);
    await userService.create(data);
  }

  signToken(user) {
    const jwtConfig = {
      expiresIn: '10h'
    }
    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.secret, jwtConfig);
    return ({user, token});
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.recoverySecret);
      const user = await adminService.findOne(payload.sub);
      if(user.recoveryToken != token) throw boom.unauthorized();
      const hash = await encryptPassword(password);
      await userService.update(user.id, {
        recoveryToken: null,
        password: hash
      });
      return {message: 'successful'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendRecovery(mail) {
    const user = await adminService.findFirst(mail);
    if(!user) throw boom.unauthorized();
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.recoverySecret, {expiresIn: '15min'});
    const link = `${config.frontUri}/new_password?token=${token}`;
    await adminService.update(user.id, {recoveryToken: token});
    return await this.sendMail({
      from: config.smtpUser,
      to: mail,
      subject: "Recupera tu cuenta",
      html: `<p>Has solicitado recuperar tu contraseña, para hacerlo, ingresa al siguiente link, si no es así has caso omiso de este mensaje</p>
      <a href="${link}">Recuperar Contraseña</a>
      `
    });
  }

  async sendMail(data) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      }
    });
    let info = await transporter.sendMail(data);

    return "successful";
  }

}

module.exports = AuthService;