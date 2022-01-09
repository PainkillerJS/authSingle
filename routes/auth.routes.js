const Router = require('express');
const { body } = require('express-validator');

const controller = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post(
  '/registration',
  body('username').notEmpty().withMessage('Username must been not empty'),
  body('password').isLength({ min: 6 }).withMessage('Password must be more 5 charasters'),
  controller.registrations,
);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
