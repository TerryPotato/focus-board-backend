const mongoose = require('mongoose')

const taskSchema = nomgoose.Schema({
    //title, description, status, tag, timestamps
    title: {
        type: String,
        required: [true, 'Titulo faltante']
    },
    description: {
        type: String
        //Opcional
    },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo'
        //Para las tres columnas
    },
    tag: {
        type: String,
        default: 'General'
        //Categorias o tipo de la task
    }
},{
      timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)