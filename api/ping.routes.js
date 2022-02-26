const express = require('express')
const { onPing, getTopHosts } = require('./ping.controller')
const router = express.Router()

router.post('/', onPing)
router.get('/tophosts', getTopHosts)

module.exports = router
