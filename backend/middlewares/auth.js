const { verifyJwt } = require('../utils/jwt');
const LoginError = require('../errors/LoginError');

module.exports = (req, res, next) => {
  // const authorizationJWT = req.headers.authorization.replace('Bearer ', '');
  const { authorization } = req.headers;
  const jwt = authorization.replace('Bearer ', '');
  // до браузера куки не доходят (в postman все работает отлично),
  // я пробовал credentials: 'include', sameSite, secureCookie,
  // наставник не отвечает, так что оставлю так, может к след этерации разберусь
  // const { jwt } = req.cookies;
  if (!jwt) {
    throw new LoginError('Необходима авторизация');
  }

  let payload;
  try {
    payload = verifyJwt(jwt);
  } catch (err) {
    next(new LoginError('Необходима авторизация [token]'));
  }
  req.user = payload;
  next();
};
