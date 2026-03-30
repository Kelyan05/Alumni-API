const router = require('express').Router();
const service = require('../service/bidService');

router.post('/', async (req, res) => {
  await service.placeBid(req);
  res.json({ message: "Bid placed" });
});

module.exports = router;