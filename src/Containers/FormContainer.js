import React, {useState} from 'react'
import UserForm from '../Components/userForm'

const FormContainer = ({loginFunc}) => {
    const [formType, setFormType] = useState("Login")

    const toggleType = ({target}) => {
        console.log(target.id)
        target.id === "login-btn" ? setFormType("Login") : setFormType("Sign Up")  
    }

    const isActive = (type) => formType === type ? "active" : "inactive"

    return (
        <div className="form-container">
            <UserForm type={formType} loginFunc={loginFunc} />
            <div className="toggle-form">
                <span 
                    id="login-btn"
                    className={'nes-pointer ' + isActive("Login")}
                    onClick={toggleType}>
                    Login
                </span>
                <span> | </span>
                <span 
                    id="sign-up-btn" 
                    className={'nes-pointer ' + isActive("Sign Up")}
                    onClick={toggleType}>
                    Sign Up
                </span>
            </div>
        </div>
    )
}

export default FormContainer
