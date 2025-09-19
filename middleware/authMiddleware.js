const jwt = require('jsonwebtoken');
const config = require('../config');

function ensureAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'bad authorization header' });
  const token = parts[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'invalid token' });
    req.user = decoded;
    next();
  });
}

module.exports = { ensureAuth };
