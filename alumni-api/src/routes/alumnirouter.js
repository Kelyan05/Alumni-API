const express = require('express');
const router = express.Router();
const alumniservice = require('../services/alumniservice');
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');

const service = new alumniservice();

/**
 * @swagger
 * /alumni/register:
 *   post:
 *     summary: Register a new alumni
 *     description: Registers a user using a valid university email domain only
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 email: "student@university.ac.uk"
 *       400:
 *         description: Invalid email or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', async (req, res) => {
  const result = await service.register(req);
  res.json(result);
});

/**
 * @swagger
 * /alumni/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user and returns JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 accessToken: "jwt_token_here"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', async (req, res) => {
  const result = await service.login(req);
  res.json(result);
});

/**
 * @swagger
 * /alumni/profile:
 *   put:
 *     summary: Update alumni profile
 *     description: Updates profile details such as LinkedIn and profile picture
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 linkedinUrl: "https://linkedin.com/in/user"
 *                 profilePic: "https://image-url.com/pic.jpg"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/profile', jwtAuthMiddleware, async (req, res) => {
  const result = await service.updateProfile(req);
  res.json(result);
});

/**
 * @swagger
 * /alumni/today:
 *   get:
 *     summary: Get today's featured alumni
 *     description: Returns the highest bidder as the featured alumni of the day
 *     tags: [Alumni]
 *     responses:
 *       200:
 *         description: Featured alumni retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 linkedinUrl: "https://linkedin.com/in/user"
 *                 thisMonthAppearanceCount: 2
 *       404:
 *         description: No bids available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "No bids"
 */
router.get('/today', async (req, res) => {
  const result = await service.getToday();
  res.json(result);
});

module.exports = router;