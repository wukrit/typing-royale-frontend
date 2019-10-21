import {useReducer} from 'react'

const challengeReducer = (state, {type, payload}) => {
    switch (type) {
        case 'NEW':
            return {...payload}
        case 'NEXT':
            const wordArr = state.prompt.text.split(" ")
            wordArr.shift()
            return {...state, prompt: {...state.prompt, text: wordArr.join(" ") }}
        default: 
            throw new Error("Undefined Challenge Dispatch Action")
    } 
}

const useChallenge = () => {
    const initialState = {}

    const [state, dispatch] = useReducer(challengeReducer, initialState)

    const fetchNewChallenge = (fetchBody) => {
        fetch('http://localhost:3000/challenges', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
        .then(res => res.json())
        // .then(console.log)
        .then(challengeObj => dispatch({type: 'NEW', payload: challengeObj}))
    }


    return [state, dispatch, fetchNewChallenge]
}

export default useChallenge