const sendJsonError = (
    err,
    res,
    codeStatus = /[sequelize|AggregateError]/i.test(err.name)
      ? 422
      : 500 ) =>{  
     
    let prop = "error";
    let responseError;
    let errorsArray;
  
    if (typeof err === "string") {
      responseError = err;
    } else if (/[sequelize|AggregateError]/i.test(err.name)) {
      errorsArray = err.errors;
  
      if (/AggregateError/i.test(err.name)) {
        errorsArray = err.errors[0].errors.errors;
      }
  
      prop += "s";
      responseError = mapped(errorsArray);
    } else if (err.message) {
      responseError = err.message;
    }
  
    return res.status(codeStatus).json({
      ok: false,
      status: codeStatus,
      [prop]: responseError,
    });
  };
  
  module.exports = { sendJsonError };