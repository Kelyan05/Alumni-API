const express = require('express')
const router = express.Router()
const alumniservice = require('../services/alumniservice')
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
const service = new alumniservice()


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
 *           example:
 *             email: student@university.ac.uk
 *             password: Password123!
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Invalid email domain
 */
router.post('/register', async (req,res)=>{
    const result = await service.register(req)
    res.json(result)
})

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
 *           example:
 *             email: student@university.ac.uk
 *             password: Password123!
 *     responses:
 *       200:
 *         description: Returns JWT token
 */
router.post('/login', async (req,res)=>{
    const result = await service.login(req)
    res.json(result)
})

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
 *             linkedinUrl: https://linkedin.com/in/user
 *             degrees: [{title: "BSc CS", url: "uni.com", date: "2022"}]
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.get('/today', async (req,res)=>{
    const result = await service.getToday()
    res.json(result)
})

module.exports = router