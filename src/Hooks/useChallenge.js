import {useReducer} from 'react'
import API from '../Config/API'

const challengeReducer = (state, {type, payload}) => {
    switch (type) {
        case 'NEW':
            return {...payload}
        // case 'NEXT':
        //     const wordArr = state.prompt.text.split(" ")
        //     wordArr.shift()
        //     return {...state, prompt: {...state.prompt, text: wordArr.join(" ") }}
        // case 'SUBMIT':
        //     console.log("Hello from the gnome dispatcher")
        default: 
            throw new Error("Undefined Challenge Dispatch Action")
    } 
}

const useChallenge = () => {
    const initialState = {}

    const [state, dispatch] = useReducer(challengeReducer, initialState)

    const fetchNewChallenge = (fetchBody) => {
        fetch(`${API}/challenges`, {
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

    const postResults = (fetchBody) => {
        fetch(`${API}/user_challenges`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
        .then(res => res.json())
        .then(console.log)
        // .then(resultObj => dispatch({:type: "SUBMIT", payload: resultObj}))
    }


    return [state, dispatch, fetchNewChallenge, postResults]
}

export default useChallenge