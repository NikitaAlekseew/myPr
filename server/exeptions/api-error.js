function createApiError(status, message, errors = []) {
  return {
    status,
    message,
    errors,
  };
}

function UnauthorizedError() {
  return createApiError(401, "Пользователь не авторизован!");
}

function BadRequest(message, errors = []) {
  return createApiError(400, message, errors);
}

module.exports = {
  createApiError,
  UnauthorizedError,
  BadRequest,
};
