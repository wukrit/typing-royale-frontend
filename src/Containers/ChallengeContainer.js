import React, {useState, useEffect} from 'react'
import Motivator from '../Components/Motivator'
import Results from '../Components/Results'

const ChallengeContainer = ({challenge, dispatch, loggedInUserId, postResults}) => {
    const wordArr = challenge.prompt !== undefined ? challenge.prompt.text.split(" ") : null
    const [totalInput, setTotalInput] = useState([])
    const [input, setInput] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [wordStatus, setWordStatus] = useState(true)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState(null)

    const handleInput = (event) => {
        if (totalInput.length === 0 && event.target.value.length === 1) {
            setStartTime(new Date())
        }
        setInput(event.target.value)       
    }

    const compareWord = (event) => {
        if (event.key === " ") {
            event.preventDefault()
            const currentWord = wordArr[0]
            if (currentWord === input) {
                setTotalInput([...totalInput, input])
                setInput("")
                setInputColor("is-success")
                dispatch({type: "NEXT"})
            } else {
                setInputColor("is-error")
                setWordStatus(false)
            }
        }
    }

    useEffect(
        () => {
            if (challenge.prompt !== undefined && totalInput.length === challenge.prompt.length) {
                setEndTime(new Date())
            }
        }, [totalInput]
    )

    const renderProgressBar = () => {
        return (
            <div className="progressbar">
                {challenge.prompt !== undefined ? 
                <progress className="nes-progress is-pattern" value={totalInput.length} max={`${challenge.prompt.length}`} />
                : null }
                <br /><br />
            </div>
        )
    }

    const renderStats = () => {
        const time = (endTime - startTime) / 1000
        const wpm = (totalInput.length) / (time / 60)
        const fetchBody = {
            user_id: loggedInUserId,
            wpm: wpm,
            challenge_id: challenge.id
        }
        postResults(fetchBody)
        return ( <p> WPM: {Math.round(wpm * 100) / 100} </p>)
    }

    const renderChallenge = () => {
        return (
            <div className="challenge">
            <div>
            {challenge.prompt !== undefined ? renderProgressBar() : null}
            <p id="prompt">
                <span className="nes-text is-success" id="completed-words">{totalInput.join(" ")}</span> <span> </span>
                {challenge.prompt !== undefined ? challenge.prompt.text : "...loading"} 
            </p>
            </div>
            <br />
            <input 
                className={"nes-input challenge-input " + inputColor} 
                type="text" 
                value={input}
                onChange={handleInput } 
                onKeyPress={compareWord}
            />
            <Motivator wordStatus={wordStatus} loggedInUserId={loggedInUserId} />
        </div>
        )
    }
    
    return (
        <div className="body-container nes-container is-rounded">
            {endTime !== null ? <Results renderStats={renderStats} /> : renderChallenge()}
        </div>
    );
}

export default ChallengeContainer
