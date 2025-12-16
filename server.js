const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./backend/config/db')
const errorHandler = require('./backend/middleware/errorMiddleware')
const cors = require('cors')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Rutas
//app.use('/api/tasks', require('./backend/routes/tareasRoutes'))
app.use('/api/users', require('./backend/routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor Iniciado en el Puerto ${port}`))


