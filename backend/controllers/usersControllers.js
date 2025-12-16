const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') // CAMBIO: Usamos bcryptjs que es más compatible
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel') // Asegúrate que el archivo se llame así

const registrar = asyncHandler(async (req, res) => {
    // 1. Desestructuración
    const { name, email, password } = req.body

    // 2. Validación de campos vacíos
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Todos los campos son obligatorios')
    }

    // 3. NUEVO: Verificar si el usuario ya existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese correo ya está registrado')
    }

    // 4. Encriptar contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 5. Crear usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            message: "Registro exitoso",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id) //Devuelve el token al registrarse para loguearlo directo
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear el usuario')
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // 1. Verificar que el usuario exista usando el EMAIL
    const user = await User.findOne({ email })

    // 2. Verificar password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Log In exitoso",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

// Generar Token
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registrar,
    login
}