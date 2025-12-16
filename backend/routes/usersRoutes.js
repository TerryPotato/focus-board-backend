const express = require('express')
const router = express.Router()
const {login, registrar} = require('../controllers/usersControllers')
const protect = require('../middleware/authMiddleware')

router.post('/login', login)
router.post('/registrar', registrar)

module.exports = router