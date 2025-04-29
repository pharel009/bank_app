
//Global error handler
export class GlobalError {
  static handleError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    if (statusCode === 500) {
      console.log('Internal server error: ', err);
    }
    return res.status(statusCode).json({ error: message });
  }
}

//custom error class
export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}