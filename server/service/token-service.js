const jwt = require("jsonwebtoken");
const { Token } = require("../db/models");

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
}

function validateAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (e) {
    return null;
  }
}

async function saveToken(user_id, refreshToken) {
  const tokenData = await Token.findOne({ where: { user_id } });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  return await Token.create({ user_id, refreshToken });
}

async function removeToken(refreshToken) {
  return await Token.destroy({ where: { refreshToken } });
}

async function findToken(refreshToken) {
  return await Token.findOne({ where: { refreshToken } });
}

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
};
