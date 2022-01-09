const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const Role = require('../models/Role');

const generateJWT = require('../helpers/generateJWT');

class AuthController {
  async registrations(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      if (await User.findOne({ username })) {
        return res.status(400).json({ message: 'User had been with username' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const role = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPassword, roles: [role.value] });

      await user.save();

      return res.status(200).json({ message: 'User created' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'User is not registered' });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Password is not corrected' });
      }

      const jwtToken = generateJWT(user._id, user.roles);
      return res.status(200).json({ jwtToken });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
}

module.exports = new AuthController();
