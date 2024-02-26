import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    surname: {
        type: String, 
        required: true 
    },
    username: {
        type: String, 
        unique: true,
        lowercase: true,
        requerid: true
    },
    password: {
        type: String, 
        minLength: [8, 'Password must be 8 characters'],
        requerid: true
    },
    email: {
        type: String,
        requerid: true
    },
    phone: {
        type: String, 
        minLength: 8, 
        maxLength: 8, 
        requerid: true
    },
    role: {
        type: String, 
        uppercase: true, 
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
})

// pro mongoose 

export default mongoose.model('user', userSchema)