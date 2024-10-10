const { validationResult } = require("express-validator");
const userService = require("../service/user-service");
const ApiError = require("../exeptions/api-error");

async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
    }
    const { firstName, email, password, About, Phone, cityId, roleId } =
      req.body;

    const profileImage = req.file ? req.file.filename : null;

    const userData = await userService.register(
      firstName,
      email,
      password,
      About,
      Phone,
      cityId,
      roleId,
      profileImage
    );

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    console.log("userData", userData);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
}

async function activate(req, res, next) {
  try {
    const activation_link = req.params.link;
    await userService.activate(activation_link);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Пользователь не авторизован!" });
    }

    const userData = await userService.refresh(refreshToken);
    if (!userData) {
      return res.status(401).json({ message: "Пользователь не авторизован!" });
    }

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  register,
  login,
  logout,
  activate,
  refresh,
};
