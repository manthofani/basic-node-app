const Item = require('../models/itemModel');

async function list(req, res) {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
}

async function get(req, res) {
  try {
    const item = await Item.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'not found' });
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    if (!data.title) return res.status(400).json({ error: 'title required' });
    const created = await Item.create(data);
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
}

async function update(req, res) {
  try {
    const data = req.body;
    const updated = await Item.update(req.params.id, data);
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
}

async function remove(req, res) {
  try {
    await Item.remove(req.params.id);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
}

module.exports = { list, get, create, update, remove };
