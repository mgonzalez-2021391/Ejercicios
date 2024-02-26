import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'


export const test = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res) => {
    try{
        // Capturar la información 
        let data = req.body
        // Encriptar la contraseña 
        data.password = await encrypt(data.password)
        // Asignar el rol por defecto 
        data.role = 'CLIENT'
        // Guardar la información 
        let user = new User(data) 
        await user.save()
        // Responder al usuario 
        return res.send({message: `Registered successfully, can be logged with user ${user.username}`})
    }catch(err){
        console.log(err)
        return res.status(500).send({message: 'Error registering user'})
    }
}

export const login = async(req, res) => {
    try{
        // Capturar los datos del body
        let { username, password } = req.body 
        // Validar que el usuario exista 
        let user = await User.findOne({username}) // buscar un solo registro 
        // Verifico que la contraseña coincida 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = { 
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Generar el token 
            let token = await generateJwt(loggedUser)
            // Responde al usuario
            return res.send({message: `Welcome ${user.name}`, loggedUser, token})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async(req, res) => { //Datos generales pero no para la password
    try{
        //Obtener el id del usuario a actualizar 
        let { id } = req.params
        // Obtener los datos a actualizar 
        let data = req.body
        // Validar si data trae datos
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        // Validar si tiene permisos (tokenización)
        // Actualizar (BD)
        let updatedUser = await User.findOneAndUpdate(
            {_id: id }, //Objects ID <- Hexadecimales (Hora sys, versión mongo, llave privada...)
            data, // Los datos que se van a actualizar 
            {new:true} //Datos que se mandan a actualizar
        )
        // Validar la actualización
        if(!updatedUser) return res.status(404).send({message: 'User not found and not update'})
        // Responder al usuario
        return res.send({message: 'Update user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res) => {
    try{
        // Obtener el Id 
        let { id } = req.params 
        //Validar si está logueado y es el mismo 
        // Eliminar (deleteOne (solo elimina) / findOneAndDelete (Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({_id: id})
        // Verificar que si elimina 
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        // Responder 
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`}) //Status 200
    }catch(err){
        console.log(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}