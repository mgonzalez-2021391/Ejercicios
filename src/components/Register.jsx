import { useState } from "react";
import { Input } from './Input.jsx'

export const  Register = ({switchAuthAndler}) => {

    const [formData, setFormData] = useState (
        {
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            username: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            },
            passwordConfirm: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const isSumbitButtonDisable = false;

    const handleRegister = async(e)=>{
        e.preventDefault()
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

    const handleValidationOnBlur = (value, field)=>{
            
    }
  return (
    <div className='register-container'>
        <form className="auth-form"
        onSubmit={handleRegister}>
            <Input
                field='email'
                label='Email'
                value={formData.email.value}
                onChangeHandler={handleValueChange}
                type='email'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
            />
            <button disabled={isSumbitButtonDisable}>
                Register
            </button>
        </form>
        <span onClick={switchAuthAndler}>
            ¿Ya tienes una cuenta? ¡Inicia sesión acá!
        </span>
    </div>
  )
}
