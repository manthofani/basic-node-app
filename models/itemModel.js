const db = require('../db');

async function getAll() {
  return await db.all('SELECT id, title, description FROM items ORDER BY id DESC');
}

async function getById(id) {
  return await db.get('SELECT id, title, description FROM items WHERE id = ?', [id]);
}

async function create(data) {
  const res = await db.run('INSERT INTO items (title, description) VALUES (?, ?)', [data.title, data.description]);
  return { id: res.id, title: data.title, description: data.description };
}

async function update(id, data) {
  await db.run('UPDATE items SET title = ?, description = ? WHERE id = ?', [data.title, data.description, id]);
  return { id: Number(id), title: data.title, description: data.description };
}

async function remove(id) {
  await db.run('DELETE FROM items WHERE id = ?', [id]);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
