const bcrypt = require("bcrypt");
const uuid = require("uuid");

const mailService = require("./mail-service");
const {
  generateTokens,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
} = require("./token-service");

const createUserDto = require("../dtos/user-dto");
const { UnauthorizedError, BadRequest } = require("../exeptions/api-error");
const { User } = require("../db/models");

async function register(
  firstName,
  email,
  password,
  About,
  Phone,
  cityId,
  roleId,
  profileImage
) {
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    throw BadRequest(`Пользователь с таким email уже существует`);
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();
    const user = await User.create({
      name: firstName,
      email,
      password: hashPassword,
      activation_link: activationLink,
      image: profileImage,
      about: About,
      phone: Phone,
      city_id: cityId,
      role_id: roleId,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = createUserDto(user);
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  } catch (error) {
    console.error(
      "Ошибка при хэшировании пароля или создании пользователя:",
      error
    );
    throw new Error("Ошибка при регистрации пользователя");
  }
}

async function activate(activation_link) {
  const user = await User.findOne({ where: { activation_link } });
  if (!user) {
    throw BadRequest(`Некорректная ссылка активации`);
  }

  user.is_activated = true;
  await user.save();
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw BadRequest(`Пользователь с таким email не был найден!`);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw BadRequest(`Неверный пароль!`);
  }

  const userDto = createUserDto(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
}

async function logout(refreshToken) {
  return await removeToken(refreshToken);
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw UnauthorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw UnauthorizedError();
  }

  const user = await User.findByPk(userData.id);

  if (!user) {
    throw UnauthorizedError("User not found");
  }

  const userDto = createUserDto(user);
  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
}

module.exports = {
  register,
  activate,
  login,
  logout,
  refresh,
};
