'use strict'

import { Schema, model}  from 'mongoose'

const appointmentSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'ACCEPTED', 'CANCELED', 'COMPLETED'],
        default: 'CREATED',
        required: true
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'animal',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    versionKey: false
})

export default model('appointment', appointmentSchema)