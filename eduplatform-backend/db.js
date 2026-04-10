const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'eduplatform.db');

let db;

async function getDb() {
  if (db) return db;
  const SQL = await initSqlJs();
  db = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      password  TEXT    NOT NULL,
      role      TEXT    NOT NULL DEFAULT 'student',
      created_at TEXT   DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS notes (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      icon    TEXT, title TEXT NOT NULL, desc TEXT,
      subject TEXT, level TEXT, pdf TEXT
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, desc TEXT, img TEXT, badge TEXT, badgeClass TEXT,
      price TEXT, original TEXT, discount TEXT,
      rating REAL DEFAULT 0, reviews INTEGER DEFAULT 0,
      category TEXT, priceRange TEXT
    );
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, excerpt TEXT, img TEXT,
      category TEXT, categoryLabel TEXT, date TEXT,
      author TEXT, authorImg TEXT, url TEXT
    );
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
      course TEXT, date TEXT DEFAULT (date('now')), status TEXT DEFAULT 'Active'
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      subject    TEXT,
      message    TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
  save();
  return db;
}

function save() {
  if (!db) return;
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}

// Wrap sql.js synchronous API to match better-sqlite3 style
function prepare(sql) {
  return {
    get: (...params) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      const row = stmt.step() ? stmt.getAsObject() : undefined;
      stmt.free();
      save();
      return row;
    },
    all: (...params) => {
      const rows = [];
      const stmt = db.prepare(sql);
      stmt.bind(params);
      while (stmt.step()) rows.push(stmt.getAsObject());
      stmt.free();
      return rows;
    },
    run: (...params) => {
      db.run(sql, params);
      const changes = db.getRowsModified();
      const lastId = db.exec('SELECT last_insert_rowid()')[0]?.values[0][0];
      save();
      return { changes, lastInsertRowid: lastId };
    },
  };
}

function exec(sql) {
  const result = db.exec(sql);
  save();
  return result;
}

module.exports = { getDb, prepare: (sql) => prepare(sql), exec };
