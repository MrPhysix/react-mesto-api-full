const { verifyJwt } = require('../utils/jwt');
const LoginError = require('../errors/LoginError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // const authorizationJWT = req.headers.authorization.replace('Bearer ', '');
  const jwt = req.cookies.jwt || authorization || authorization.replace('Bearer ', '');
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
