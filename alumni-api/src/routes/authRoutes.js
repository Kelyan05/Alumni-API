const router = require('express').Router();
const service = require('../service/authService');

router.post('/register', async (req, res) => {
  await service.register(req.body.email, req.body.password);
  res.json({ message: "Registered" });
});

router.post('/login', async (req, res) => {
  const ok = await service.login(req);
  if (!ok) return res.status(401).json({ error: "Invalid" });

  res.json({ message: "Logged in" });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

module.exports = router;