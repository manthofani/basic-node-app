const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const existing = await User.findByUsername(username);
    if (existing) return res.status(400).json({ error: 'username already exists' });

    const user = await User.createUser(username, password);
    return res.status(201).json({ id: user.id, username: user.username });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'internal error' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const user = await User.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await User.verifyPassword(user, password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'internal error' });
  }
}

module.exports = { register, login };
