const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const protect = asyncHandler (async (req, res, next) =>{

    let token

    if(req.headers.authorization && req.authorization.startsWith('Bearer')){
        try{
            //Obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificamos que el token sea valido (firma, caducidad)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtener los datos del usuario a traves del id_usuario que esta en el paylod
            //para que cualquier endpoint que use proteccion tenga acceso a esos datos
            req.user = await User.findById(decoded.id_ususario).select('-password')

            //continuamos con un next para salir de aqui y evetar quedarnos para simpre
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')

        }
    } if (!token){
        res.status(401)
            throw new Error('Acceso no autorizado, no se proporciono un token')
    }
})

module.exports = protect