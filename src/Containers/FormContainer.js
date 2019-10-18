import React, {useState} from 'react'
import UserForm from '../Components/userForm'

const FormContainer = ({loginFunc}) => {
    const [formType, setFormType] = useState("Login")


    return (
        <>
            <UserForm type={formType} loginFunc={loginFunc} />
            <div className="toggle-form">
                <span className={formType === "Login" ? "active" : "inactive" }>Login</span>
                <span> | </span>
                 <span className={formType === "Sign Up" ? "active" : "inactive" }>Sign Up</span>
            </div>
        </>
    )
}

export default FormContainer
