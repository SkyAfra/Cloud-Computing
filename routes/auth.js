const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  register
);
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  login
);
router.post('/logout', authMiddleware, logout);

module.exports = router;
