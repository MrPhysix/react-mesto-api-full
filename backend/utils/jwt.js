require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function getJwt(user) {
  return jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
    { expiresIn: '7d' },
  );
}

function verifyJwt(token) {
  return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
}

module.exports = {
  getJwt,
  verifyJwt,
};
