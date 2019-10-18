import React, {useState} from 'react'

const UserForm = ({type, login}) => {
    const initialDraft = {username: "", password: ""}
    const [draft, setDraft] = useState(initialDraft)
    const {username, password} = draft

    const handleInput = ({target}) => {
        setDraft({...draft, [target.name]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const slug = (type === "Login" ? "login" : "users")
        login(draft, slug)
        setDraft(initialDraft)
    }

    return (
        <div className="user-form">
            <h2>{type}</h2>
            <form onSubmit={handleSubmit} className="nes-field">
                <label>Username</label> 
                <br />
                <input 
                    type="text" 
                    value={username} 
                    name='username' 
                    onChange={handleInput}
                    className="nes-input"
                    /> 
                <br />
                <label>Password</label> 
                <br />
                <input 
                    type="password" 
                    value={password} 
                    name="password" 
                    onChange={handleInput} 
                    className="nes-input"
                    />
                 <br />
                <input 
                    type="submit" 
                    value={type} 
                    className="nes-btn"
                    />              
            </form>
        </div>
    )
}

export default UserForm