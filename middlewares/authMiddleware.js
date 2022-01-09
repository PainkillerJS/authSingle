const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTION') {
    next();
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: 'User is not authorization' });
    }

    const decodeData = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decodeData;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'User is not authorization' });
  }
};
