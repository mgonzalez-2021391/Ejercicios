'use strict'
import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const test = async (req, res) => {
    return res.send({message: 'Function test is running | appointment'})
}

export const save = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        data.user = req.user._id
        //Verificar si existe el animal
        let animal = Animal.findOne({_id : data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga cita activa con esa persona
        //EJERCICIO: Que el usuario sólo pueda tener una cita por día
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.date
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        if(onlyAppointment) return res.send({message: 'Appointment already exist'})
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment saved successfully in date ${appointment.date}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error creating appointment', err})
    }
}