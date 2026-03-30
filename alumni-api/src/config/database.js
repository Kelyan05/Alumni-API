const mysql = require('mysql2/promise');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//Test your connection
async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log(' MySQL Connected Successfully!');
      connection.release(); // Release connection back to the pool
    } catch (error) {
      console.error(' MySQL Connection Failed:', error);
      process.exit(1); // Exit process if connection fails
    }
  }
  
  testConnection(); // Run connection test


  
module.exports = pool;