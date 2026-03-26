require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const cron = require('node-cron');
const db = require('./src/config/database');

cron.schedule('0 18 * * *', async () => {
  const [rows] = await db.query(
    'SELECT * FROM bids WHERE bid_date = CURDATE() ORDER BY amount DESC LIMIT 1'
  );

  if (rows[0]) {
    await db.query('UPDATE bids SET status="won" WHERE id=?', [rows[0].id]);
  }
});

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/bids', require('./src/routes/bidRoutes'));

app.listen(process.env.PORT, () => {
  console.log("Server running");
});