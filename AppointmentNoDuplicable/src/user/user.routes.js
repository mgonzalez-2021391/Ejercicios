import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { test, register, login, update, deleteU } from './user.controller.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)

//Rutas privadas
api.get('/test',[validateJwt], [isAdmin], test)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteU)

export default api