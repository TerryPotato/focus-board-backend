const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel') // CORREGIDO (Singular)

const protect = asyncHandler(async (req, res, next) => {
    let token

    // CORREGIDO: req.headers.authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            // Verificamos firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // CORREGIDO: Usamos decoded.id (porque así lo guardaste en el controlador)
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporciono un token')
    }
})

module.exports = protect