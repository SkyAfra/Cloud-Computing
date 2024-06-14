const { InputError } = require('../exceptions/InputError');

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof InputError) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: `${err.message} Silakan gunakan foto lain.`,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

module.exports = errorHandlingMiddleware;
