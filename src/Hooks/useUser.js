import React, {useReducer} from 'react'

const userReducer = (state, {type, payload}) => {
    const {loggedInUserId, token} = state
    switch (type) {
        case 'LOGIN':
            const {token, user_id} = payload
            localStorage.setItem('loggedInUserId', user_id)
            localStorage.setItem('token', token)
            return {...state, token, loggedInUserId: user_id}
        case "SET":
            return {...state, token: payload.token, loggedInUserId: payload.user_id}
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

    const login = (userObj, slug) => {
        console.log(slug)
        fetch(`http://localhost:3000/${slug.toLowerCase()}`, {
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