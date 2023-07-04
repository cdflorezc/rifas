//importación del sequelize
const {Sequelize} = require('sequelize');
//importación del archivo de configuración con las variables de entorno
const {config} = require('../config/config');

const setupModels = require('../database/models');

const options = {
    dialect: 'postgres',
    logging: config.isProd ? false : false
}

if(config.isProd) options.dialectOptions = {ssl: {rejectUnauthorized: false}};

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
