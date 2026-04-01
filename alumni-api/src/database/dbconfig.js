const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'alumni.db');

const connection = new sqlite3.Database(dbPath, err => {
  if (err) console.error(err);
  else console.log('Connected to SQLite DB');
});

// USERS (auth)
connection.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// ALUMNI (profile)
connection.run(`
CREATE TABLE IF NOT EXISTS alumni (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  profilePic TEXT,
  linkedinUrl TEXT,
  thisMonthAppearanceCount INTEGER DEFAULT 0,
  isFeatured INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
)`);

// BIDS
connection.run(`
CREATE TABLE IF NOT EXISTS bids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alumniID INTEGER NOT NULL,
  amount REAL NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alumniID) REFERENCES alumni(id) ON DELETE CASCADE
)`);

module.exports = connection;