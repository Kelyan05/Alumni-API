const express = require('express')
const router = express.Router()
const bidservice = require('../services/bidservice')
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
const service = new bidservice()

/**
 * @swagger
 * /bid/makebid:
 *   post:
 *     summary: Place a blind bid
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             amount: 100
 *     responses:
 *       200:
 *         description: Bid placed
 */
router.post('/makebid', jwtAuthMiddleware, async (req,res)=>{
    const result = await service.create(req)
    res.json(result)
})


/**
 * @swagger
 * /bid/status:
 *   get:
 *     summary: Get bid status (Winning/Losing)
 *     tags: [Bidding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns status
 */
router.get('/status', jwtAuthMiddleware, async (req,res)=>{
    const result = await service.getStatus(req)
    res.json(result)
})

module.exports = router