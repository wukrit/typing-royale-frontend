import React, {useReducer} from 'react'

const userReducer = (state, {type, payload}) => {
    const {loggedInUserId, token} = state
    switch (type) {
        case 'LOGIN':
            const {token, user_id} = payload
            return {...state, token, loggedInUserId: user_id}
        default:
            throw new Error("Undefined User Dispatch Action")
    }
} 

const useUser = () => {
    const initialState = {
        loggedInUserId: null,
        token: "",
        prompt: {}
    }

    const login = (userObj) => {
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(authObj => {
            dispatch({type: "LOGIN", payload: authObj})
        })
    }

    const [state, dispatch] = useReducer(userReducer, initialState)
    const {loggedInUserId, token, prompt} = state

    

    return [state, dispatch, login]
}

export default useUser