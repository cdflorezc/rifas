const bcrypt = require('bcrypt');

async function encryptPassword(pwd){
  return await bcrypt.hash(pwd, 10);
}

async function comparePassword(pwd, hash){
  return await bcrypt.compare(pwd, hash);
}

module.exports = {encryptPassword, comparePassword};