'use strict'

import { Router } from 'express'
import { test, save, get, update, deleteA, search } from './animal.controller.js'

const api = Router()

api.get('/test', test)
api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update) //Middleware -> funciones que sirven para validar.
api.delete('/delete/:id', deleteA)
api.post('/search', search)


export default api