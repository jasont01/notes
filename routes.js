const express = require('express')

const router = express.Router()

router.use('/auth', require('./routes/authRoutes'))
router.use('/users', require('./routes/userRoutes'))
router.use('/notes', require('./routes/noteRoutes'))

module.exports = router
