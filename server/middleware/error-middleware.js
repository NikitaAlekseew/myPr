const { createApiError } = require("../exeptions/api-error");

module.exports = function (err, req, res, next) {
  console.log(err);

  if (err && err.status && err.message) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors || [] });
  }

  // 500 - Ошибка на сервере
  return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
