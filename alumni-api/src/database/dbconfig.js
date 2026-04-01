const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'alumni.db');
const connection = new sqlite3.Database(dbPath, err => {
  if (err) console.error(err);
  else console.log('Connected to SQLite DB');
});

module.exports = connection;

// users table
const createUsersTable = () => {
  connection.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isVerified INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
    }
  });
};

// alumni table
const createAlumniTable = () => {
  connection.run(`
    CREATE TABLE IF NOT EXISTS alumni (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      profilePic TEXT,
      linkedinUrl TEXT,
      thisMonthAppearanceCount INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating alumni table:', err);
    } else {
      console.log('Alumni table ready');
    }
  });
};

// bids table
const createBidsTable = () => {
  connection.run(`
    CREATE TABLE IF NOT EXISTS bids (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      alumniID INTEGER NOT NULL,
      amount REAL NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniID) REFERENCES alumni(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating bids table:', err);
    } else {
      console.log('Bids table ready');
    }
  });
};

createUsersTable()
createAlumniTable()
createBidsTable()
module.exports = connection
