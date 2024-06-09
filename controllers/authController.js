const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ error: true, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.collection('users').add({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).send({ error: false, message: 'User registered' });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).send({ error: true, message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) {
      return res.status(400).json({ error: true, message: 'Invalid credentials' });
    }

    const user = snapshot.docs[0].data();
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: true, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: snapshot.docs[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.header('Authorization', token).send({
      error: false,
      message: 'Login successful',
      loginResult: {
        userId: snapshot.docs[0].id,
        email: user.email,
        username: user.username,
        token,
      },
    });
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).send({ error: true, message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  // Implement token revocation or removal on the client-side
  res.status(200).send({ error: false, message: 'Logout successful' });
};
