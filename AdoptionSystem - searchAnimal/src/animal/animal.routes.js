'use strict'

import { Router } from 'express'
import { test, save, get, search } from './animal.controller.js'

const api = Router()

api.get('/test', test)
api.post('/save', save)
api.get('/get', get)
api.post('/search', search)


export default api