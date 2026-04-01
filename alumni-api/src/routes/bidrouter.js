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
 *     description: Alumni place a blind bid; cannot see others' bids
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MakeBidRequest'
 *     responses:
 *       200:
 *         description: Bid placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 bidId: 1
 *       400:
 *         description: Invalid bid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/makebid', jwtAuthMiddleware, async (req, res) => {
  const result = await service.create(req);
  res.json(result);
});

/**
 * @swagger
 * /bid/status:
 *   get:
 *     summary: Get bid status
 *     description: Shows if the current user's bid is winning or losing
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bid status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: "Winning"
 *       404:
 *         description: No bids
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/status', jwtAuthMiddleware, async (req, res) => {
  const result = await service.getStatus(req);
  res.json(result);
});

module.exports = router;