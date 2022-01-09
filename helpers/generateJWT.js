const jwt = require('jsonwebtoken');

const generateJWT = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

module.exports = generateJWT;
