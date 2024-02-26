import mongoose, {model, Schema } from "mongoose"
const animalSchema = mongoose.Schema({
    name: {
        type: String, 
        requerid: true
    },
    type: { 
        type: String, 
        requerid: true
    },
    color: {
        type: String, 
        requerid: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: "user",
        requerid: true
    }
},{
    versionKey: false   
})

export default model('animal', animalSchema)
