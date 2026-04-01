const express = require('express');
const router = express.Router();
const bidservice = require('../services/bidservice');
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const service = new bidservice();

/**
 * @swagger
 * /bid/makebid:
 *   post:
 *     summary: Place a blind bid
 *     description: Allows users to place a bid without seeing other bids
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BidRequest'
 *     responses:
 *       200:
 *         description: Bid placed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 bidId: 1
 *       400:
 *         description: Invalid bid amount
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Invalid amount"
 *       401:
 *         description: Unauthorized
 */
router.post('/makebid', jwtAuthMiddleware, async (req, res) => {
  const result = await service.create(req);
  res.json(result);
});

/**
 * @swagger
 * /bid/update:
 *   put:
 *     summary: Update existing bid (increase only)
 *     description: Users can only increase their current bid amount
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BidRequest'
 *     responses:
 *       200:
 *         description: Bid updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Bid updated"
 *       400:
 *         description: New bid must be higher than previous
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Must increase bid"
 *       401:
 *         description: Unauthorized
 */
router.put('/update', jwtAuthMiddleware, async (req, res) => {
  const result = await service.update(req);
  res.json(result);
});

/**
 * @swagger
 * /bid/status:
 *   get:
 *     summary: Get bid status
 *     description: Returns whether the user is currently winning or losing
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status retrieved
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 status: "Winning"
 *       401:
 *         description: Unauthorized
 */
router.get('/status', jwtAuthMiddleware, async (req, res) => {
  const result = await service.getStatus(req);
  res.json(result);
});

module.exports = router;