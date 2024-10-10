const { UnauthorizedError } = require("../exeptions/api-error");
const { validateAccessToken } = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(UnauthorizedError());
  }
};
