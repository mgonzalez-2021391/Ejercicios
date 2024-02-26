import express from 'express'
import { register, login } from './user.controller.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)

export default api