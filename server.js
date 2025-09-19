const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const compareRoutes = require('./routes/compare');

const app = express();
app.use(cors());
app.use(express.json());

async function init() {
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )`);

  const user = await db.get('SELECT id FROM users WHERE username = ?', ['admin']);
  if (!user) {
    const hash = await bcrypt.hash('admin123', 10);
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hash]);
    console.log('Seeded user: admin / admin123');
  }
}

init().catch(err => {
  console.error('Failed to init db', err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/compare', compareRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend ready on http://localhost:${PORT}`));
