import {useReducer} from 'react'

const promptReducer = (state, {type, payload}) => {
    const {prompt} = state 
    switch (type) {
        case 'GET':
            return console.log("something")
        default: 
            throw new Error("Undefined Prompt Dispatch Action")
    } 
}

const usePrompt = () => {
    const initialState = {prompt: {}}

    const [state, dispatch] = useReducer(promptReducer, initialState)
    const {prompt} = state

    const fetchNewPrompt = () => {
        return null
    }


    return [state, dispatch]
}

export default usePrompt