'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import {config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'

const app = express()
config()

const port = process.env.PORT || 3056 

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) // Aceptar o denegar solicitudes de diferentes origenes (local, remote) / Políticas de acceso
app.use(helmet()) // Aplica la capa basica del servidor 
app.use(morgan('dev')) // logs de solicitudes al servidor http

app.use('/user', userRoutes)
app.use('/animal', animalRoutes)

export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
 
