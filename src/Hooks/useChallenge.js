import {useReducer} from 'react'

const challengeReducer = (state, {type, payload}) => {
    const {challenge} = state 
    switch (type) {
        case 'NEW':
            
        default: 
            throw new Error("Undefined Challenge Dispatch Action")
    } 
}

const useChallenge = () => {
    const initialState = {challenge: {}}

    const [state, dispatch] = useReducer(challengeReducer, initialState)
    const {challenge} = state

    // const fetchNewChallenge = (challengeId) => {
    //     fetch('http://localhost:3000/challenges', {
    //         method: "POST",
    //         headers: 
    //     })
    // }


    return [state, dispatch]
}

export default useChallenge