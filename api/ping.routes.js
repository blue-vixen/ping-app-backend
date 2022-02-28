const express = require('express')
const { onPing, getHosts } = require('./ping.controller')
const router = express.Router()

router.post('/ping', onPing)
router.get('/hosts', getHosts)

module.exports = router
