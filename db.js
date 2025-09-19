const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('./config');
const dbFile = path.join(__dirname, config.dbFile);

const db = new sqlite3.Database(dbFile);

function run(sql, params) {
  params = params || [];
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params) {
  params = params || [];
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params) {
  params = params || [];
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { db, run, get, all };
