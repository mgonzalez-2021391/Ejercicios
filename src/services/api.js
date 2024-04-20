import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
    baseURL: 'http://localhost:2656/twitch/v1',
    timeout: 1000
})

export const registerRequest = async(user) => {
    try {
        return await apiClient.post('/auth/register', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async() => {
    try {
        toast.success('Inicio de sesión exitoso')
        //return await apiClient.put('/auth/login', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}