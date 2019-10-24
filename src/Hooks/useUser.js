import {useReducer} from 'react'
import API from '../Config/API'

const userReducer = (state, {type, payload}) => {
    // const {loggedInUserId, token, username, bio, img_url} = state
    switch (type) {
        case 'LOGIN':
            const {token, user_id} = payload
            localStorage.setItem('loggedInUserId', user_id)
            localStorage.setItem('token', token)
            return {...state, token, loggedInUserId: user_id}
        case 'LOGOUT':
            localStorage.clear()
            return {loggedInUserId: null, token: null, username: null, bio: null, img_url: null}
        case "SET":
            return {...state, token: payload.token, loggedInUserId: payload.user_id}
        case "GET": 
            const {username, bio, img_url} = payload
            return {...state, username, bio, img_url}
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
        fetch(`${API}/${slug.toLowerCase()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(authObj => {
            if (authObj.errors) {
                console.log(errors)
            } else {
                window.history.pushState({urlPath:'/'}, "Home", "/")
                dispatch({type: "LOGIN", payload: authObj})
            }
        })
    }

    const getUserData = (userId, token) => {
        if (userId) {
        fetch(`${API}/users/${userId}`, {
            headers: {"Authorization": token }
        })
        .then(res => res.json())
        .then(userObj => dispatch({type: 'GET', payload: userObj}))
        } else {
            // render something 
            console.log("Nope")
        }
    }

    const [state, dispatch] = useReducer(userReducer, initialState)
    // const {loggedInUserId, token, prompt} = state

    

    return [state, dispatch, login, getUserData]
}

export default useUser