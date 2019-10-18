import React, {useState} from 'react'

const UserForm = ({type, loginFunc}) => {
    const initialDraft = {username: "", password: ""}
    const [draft, setDraft] = useState(initialDraft)
    const {username, password} = draft

    const handleInput = ({target}) => {
        setDraft({...draft, [target.name]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginFunc(draft)
        setDraft(initialDraft)
    }

    return (
        <div className="user-form">
            <h2>{type}</h2>
            <form onSubmit={handleSubmit} >
                <label>Username</label> 
                <br />
                <input 
                    type="text" 
                    value={username} 
                    name='username' 
                    onChange={handleInput} /> 
                <br />
                <label>Password</label> 
                <br />
                <input 
                    type="password" 
                    value={password} 
                    name="password" 
                    onChange={handleInput} /> 
                <br />
                <input 
                    type="submit" 
                    value={type} />              
            </form>
        </div>
    )
}

export default UserForm