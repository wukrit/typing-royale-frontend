import React, {useReducer} from 'react'

const promptReducer = (state, {type, payload}) => {
    const {prompt} = state 
    switch (type) {
        default: 
            throw new Error("Undefined Prompt Dispatch Action")
    } 
}

export const usePrompt = () => {
    const initialState = {prompt: {}}

    const [state, dispatch] = useReducer(promptReducer, initalState)
    const {prompt} = state

    return [state, dispatch]
}