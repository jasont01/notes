const express = require('express')

const router = express.Router()

router.use('/auth', require('./authRoutes'))
router.use('/users', require('./userRoutes'))
router.use('/notes', require('./noteRoutes'))

module.exports = router
