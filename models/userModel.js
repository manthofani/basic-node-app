const bcrypt = require('bcryptjs');
const db = require('../db');

async function createUser(username, password) {
  const hash = await bcrypt.hash(password, 10);
  const res = await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
  return { id: res.id, username };
}

async function findByUsername(username) {
  return await db.get('SELECT id, username, password FROM users WHERE username = ?', [username]);
}

async function findById(id) {
  return await db.get('SELECT id, username FROM users WHERE id = ?', [id]);
}

async function verifyPassword(userRow, password) {
  if (!userRow) return false;
  return await bcrypt.compare(password, userRow.password);
}

module.exports = { createUser, findByUsername, findById, verifyPassword };
