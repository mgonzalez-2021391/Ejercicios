import { useState } from "react";
import { Input } from "./Input.jsx";
import { emailValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from "../shared/validators/validator.js";
import { useLogin } from "../shared/hooks/useLogin.jsx";
//import toast, { Toaster } from "react-hot-toast";

export const Login = ({switchAuthAndler}) => {
    const {login, isLoading} = useLogin()

    const [formData, setFormData] = useState (
        {
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const mandar = () => {
        window.location.href = './Register.jsx'
    }

    const isSubmitButtonDisable = !formData.email.isValid ||
                                  !formData.password.isValid

    const handleLogin = async(e)=>{
        e.preventDefault()
            login(
                formData.email.value,
                formData.password.value
            )
            console.log(formData)
    }

    const handleValueChange = (value, field) =>{
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch(field){
            case 'email':
                isValid = validateEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            default:
                break
        }
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }
    return(
        <div className="register-container">
            <form action="" className="auth-form" 
            onSubmit={handleLogin}>
                <Input
                    field='email'
                    label='Email'
                    value={formData.email.value}
                    onChangeHandler={handleValueChange}
                    type='email'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field='password'
                    label='Password'
                    value={formData.password.value}
                    onChangeHandler={handleValueChange}
                    type='password'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.password.showError}
                    validationMessage={passwordValidationMessage}
                />
                <button className="login" disabled={isSubmitButtonDisable}>
                    Login
                </button>
            </form>
            <span className="cursor" onClick={mandar}>
                ¿Aún no tienes cuenta? ¡Regístrate aquí!
            </span>
        </div>
    )
    
}