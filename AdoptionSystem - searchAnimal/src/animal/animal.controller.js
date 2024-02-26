'use strict'

import Animal from './animal.model.js'
import User from '../user/user.model.js'

export const save = async(req, res) => {
    try{
    let data = req.body
    let user = await User.findOne({_id: data.keeper})
    if(!user) return res.status(404).send({message: 'Keeper not found'})
    let animal = new Animal(data)
    await animal.save()
    return res.send({message: 'Animal saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving animal'})   
    }
}

export const get = async(req, res) => { 
    try{
        let animals = await Animal.find()
        return res.send({ animals })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting animals'})
    }
}

export const search = async(req, res) => {
    try{
        let { search } = req.body
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name'])
        return res.send({message: 'Animals found:', animals})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error searching animal'})
    }
}