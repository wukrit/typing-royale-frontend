import React, {useReducer} from 'react'

const userReducer = (state, {type, payload}) => {
    const {loggedInUserId, token} = state
    switch (type) {
        default:
            throw new Error("Undefined User Dispatch Action")
    }
} 

export const useUser = () => {
    const initialState = {
        loggedInUserId: null,
        token: "",
        prompt: {}
    }

    const [state, dispatch] = useReducer(userReducer, initialState)
    const {loggedInUserId, token, prompt} = state

    

    return [state, dispatch]
}
