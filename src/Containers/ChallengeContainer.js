import React, {useState, useEffect, Suspense} from 'react'
import Motivator from '../Components/Motivator'
import Results from '../Components/Results'
import { ActionCableConsumer } from 'react-actioncable-provider'


const ChallengeContainer = ({dispatch, loggedInUserId, postResults}) => {
    
    const [challenge, setChallenge] = useState(null)
    const [wordArr, setWordArr] = useState(null)
    const [totalInput, setTotalInput] = useState([])
    const [input, setInput] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [wordStatus, setWordStatus] = useState(true)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState(null)

    useEffect(
        () => {
            const urlArr = window.location.href.split("/")
            const slug = urlArr[urlArr.length - 1]
            if (challenge === null) {
                fetch(`http://localhost:3000/challenges/${slug}`)
                .then(res => res.json())
                .then(challengeObj => {
                    setChallenge(challengeObj)
                })
            }
            if (challenge !== null
                && challenge.prompt !== undefined
                && wordArr === null) {
                setWordArr(challenge.prompt.text.split(" "))
            }
        }
    )

    useEffect(
        () => {
            if (challenge !== null && challenge.prompt !== undefined && totalInput.length === challenge.prompt.length) {
                setEndTime(new Date())
            }
        }, [totalInput]
    )

    const handleInput = (event) => {
        if (totalInput.length === 0 && event.target.value.length === 1) {
            setStartTime(new Date())
        }
        setInput(event.target.value)       
    }

    const updateProgress = () => {
        setWordArr(wordArr.slice(1, wordArr.length))

        const fetchBody = {
            uuid: challenge.uuid,
            progress: totalInput.length,
            user_id: loggedInUserId            
        }
        fetch(`http://localhost:3000/challenges/${challenge.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
        .then(res => res.json())
        .then(console.log)
    }

    const compareWord = (event) => {
        if (event.key === " ") {
            event.preventDefault()
            const currentWord = wordArr[0]
            if (currentWord === input) {
                setTotalInput([...totalInput, input])
                setInput("")
                setInputColor("is-success")
                updateProgress()
                dispatch({type: "NEXT"})
            } else {
                setInputColor("is-error")
                setWordStatus(false)
            }
        }
    }

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
            {renderProgressBar()}
            <p id="prompt">
                <span className="nes-text is-success" id="completed-words">{totalInput.join(" ")}</span> <span> </span>
                {wordArr !== null ? wordArr.join(" ") : "loading..."} 
            </p>
            </div>
            <br />
            <input
                autoFocus 
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
        <>
            {challenge !== null ?
            <>
                <ActionCableConsumer
                    channel={{channel: 'ChallengesChannel', uuid: challenge.uuid}}
                    onConnected={() => console.log('')}
                    onReceived={(payload) => {
                        console.log(payload.player_one_progress)
                    }}
                >
                <div className="body-container nes-container is-rounded">
                    {endTime !== null ? <Results renderStats={renderStats} /> : renderChallenge()}
                </div>
                </ActionCableConsumer>
            </> 
            : <div>...loading</div> }
        </>
    );
}

export default ChallengeContainer
