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
 *     description: Registers a user using university email domain only
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
 *             example:
 *               success: true
 *               data:
 *                 message: "User registered successfully"
 *       400:
 *         description: Invalid email or input
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Invalid university email"
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
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 token: "jwt_token_here"
 *       401:
 *         description: Invalid credentials
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
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             linkedinUrl: "https://linkedin.com/in/user"
 *             profilePic: "https://image-url.com/pic.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Profile updated"
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', jwtAuthMiddleware, async (req, res) => {
  const result = await service.updateProfile(req);
  res.json(result);
});

/**
 * @swagger
 * /alumni/today:
 *   get:
 *     summary: Get today's featured alumnus
 *     tags: [Public API]
 *     responses:
 *       200:
 *         description: Returns featured alumnus
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 linkedinUrl: "https://linkedin.com/in/user"
 */
router.get('/today', async (req, res) => {
  const result = await service.getToday();
  res.json(result);
});

module.exports = router;