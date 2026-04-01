const express = require('express')
const router = express.Router()
const alumniservice = require('../services/alumniservice')
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
const service = new alumniservice()

router.post('/register', async (req,res)=>{
    const result = await service.register(req)
    res.json(result)
})

router.post('/login', async (req,res)=>{
    const result = await service.login(req)
    res.json(result)
})

router.get('/today', async (req,res)=>{
    const result = await service.getToday()
    res.json(result)
})

module.exports = router