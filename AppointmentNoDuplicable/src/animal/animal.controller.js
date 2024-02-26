'use strict'

import Animal from './animal.model.js'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log("Test is running")
    res.send({message: 'test is function running'})
}

export const save = async(req, res) => {
    try{
    // Capturar la data
    let data = req.body
    // Validar la existencia del keeper 
    let user = await User.findOne({_id: data.keeper})
    if(!user) return res.status(404).send({message: 'Keeper not found'})
    // Crear la instancia del 'animal'
    let animal = new Animal(data)
    // Guardar el animal 
    await animal.save()
    // Responder al usuario si todo ok 
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

export const update = async(req, res) => {
    try{
    // Capturar la data 
    let data = req.body
    // Capturar el id del animal a actualizar 
    let { id } = req.params
    // Validar que vengan a datos
    let update = checkUpdate(data, false)
    if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update or missing data'})
    // Actualizar 
    let updateAnimal = await Animal.findOneAndUpdate(
        {_id: id},
        data,
        {new : true}
    ).populate('keeper', ['name'])
    // Validar la actualización 
    if(!update) return res.status(400).send({message: 'Animal not found and not update'})
     // Eliminar la información sensible 
    // Responder si todo sale bien 
    return res.send({message: 'Animal update succesfully', updateAnimal})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating animal'})
    }
}

export const deleteA = async(req, res) =>{
    try{
        // Verificar si tiene una reunion en proceso
        
        // Capturar el id
        let { id } = req.params 
        // Eliminar 
        let deleteAnimal = await Animal.findOneAndDelete({_id: id})
        // Validar que se eliminó
        if(deleteAnimal.deleteCount === 0) return res.status(404).send({message: 'Animal not found and not deleted'})
        // Responder
        return res.send({message: 'Deleted animal successfully'})
    }catch(err){
        console.error(err)
        return res.status(400).send({message: 'Error deleting animal'})
    }
}

export const search = async(req, res) => {
    try{
        // Obtener el dato de busqueda 
        let { search } = req.body 
        // Buscar 
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name'])
        // Responder si todo sale bien 
        return res.send({message: 'Animals found:', animals})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error searching animal'})
    }
}