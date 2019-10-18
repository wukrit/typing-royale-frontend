import React, {useReducer} from 'react'

const promptReducer = (state, {type, payload}) => {
    const {prompt} = state 
    switch (type) {
        default: 
            throw new Error("Undefined Prompt Dispatch Action")
    } 
}

const usePrompt = () => {
    const initialState = {prompt: {}}

    const [state, dispatch] = useReducer(promptReducer, initialState)
    const {prompt} = state

    return [state, dispatch]
}

export default usePrompt