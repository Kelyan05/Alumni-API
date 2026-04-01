const express = require('express')
const router = express.Router()
const bidservice = require('../services/bidservice')
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
const service = new bidservice()

router.post('/makebid', jwtAuthMiddleware, async (req,res)=>{
    const result = await service.create(req)
    res.json(result)
})

router.get('/status', jwtAuthMiddleware, async (req,res)=>{
    const result = await service.getStatus(req)
    res.json(result)
})

module.exports = router