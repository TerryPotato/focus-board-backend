const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    //name, email, password
    name: {
        type: String,
        required: [true, 'Nombre faltante']
    },
    email: {
        type: String,
        required: [true, 'Email faltante'],
        unique: [true, 'El correo proporcionado ya esta en uso']
    },
    password: {
        type: String,
        required: [true, 'Contraseña faltante']
    }
})