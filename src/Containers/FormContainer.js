import React, {useState} from 'react'
import UserForm from '../Components/userForm'

const FormContainer = ({login}) => {
    const [formType, setFormType] = useState("Login")

    const toggleType = ({target}) => {
        console.log(target.id)
        target.id === "login-btn" ? setFormType("Login") : setFormType("Sign Up")  
    }

    const isActive = (type) => formType === type ? "active" : "inactive"

    return (
        <div className="form-container nes-container is-rounded">
            <UserForm type={formType} login={login} />
            <br />
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
