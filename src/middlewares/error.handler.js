const { ValidationError, ForeignKeyConstraintError } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function queryErrorHandler(err, req, res, next) {
  //si es un error de validacion
    if(err instanceof ValidationError || err instanceof ForeignKeyConstraintError) {
        let mssg;
        //Analizamos el tipo de error por su código
        switch(err.parent.code) {
            case '23505':
                mssg = `The field ${err.errors[0].path} can't be repeated`;
                break;
            case '23503':
                mssg = err.parent.detail;
                break;
            default:
                break;
        }
        //lanzamos el error
        throw boom.conflict(mssg);
        }
        next(err);
    }

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
});
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, queryErrorHandler }
