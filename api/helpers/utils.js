module.exports = class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.count = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "success";
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    // if (message.name !== undefined && message.name === "invalid_grant") {
    //     this.message = JSON.parse(message.message).error_description;
    //     this.statusCode = 403;
    // }
    // if (message.name !== undefined && message.name === "SequelizeUniqueConstraintError") {
    //     this.message = message.errors[0].message;
    // }
    // if (message.name !== undefined && message.name === "SequelizeDatabaseError") {
    //     this.message = message.parent.hint;
    // }
    this.type = "error";
  }

  send(res) {
    if (this.type === "success") {
      if (Array.isArray(this.data)) {
        const result = {
          status: this.type,
          message: this.message,
          count: this.data.length,
          data: this.data,
        };
        return res.status(this.statusCode).json(result);
      } else {
        const result = {
          status: this.type,
          message: this.message,
          data: this.data,
        };
        return res.status(this.statusCode).json(result);
      }
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
};
