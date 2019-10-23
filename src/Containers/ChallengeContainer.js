import React, {useState, useEffect, Suspense} from 'react'
import Motivator from '../Components/Motivator'
import Results from '../Components/Results'
import { ActionCableConsumer } from 'react-actioncable-provider'
import Input from '../Components/Input'
import ProgressBar from '../Components/ProgressBar'


const ChallengeContainer = ({username, loggedInUserId, postResults}) => {
    
    const [challenge, setChallenge] = useState(null)
    const [wordArr, setWordArr] = useState(null)
    const [totalInput, setTotalInput] = useState([])
    const [wordStatus, setWordStatus] = useState(true)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState(null)
    const [input, setInput] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [subscribed, setSubscribed] = useState(false)
    const [players, setPlayers] = useState({})
    // const [done, setDone] = useState(false)

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
                && wordArr === null
                && subscribed === false) {
                setWordArr(challenge.prompt.text.split(" "))
                setSubscribed(true)
                subscribeToChallenge()    
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

    const compareWord = (event) => {
        if (event.key === " ") {
            event.preventDefault()
            const currentWord = wordArr[0]
            if (currentWord === input) {
                setTotalInput([...totalInput, input])
                setInput("")
                setInputColor("is-success")
                updateProgress()
                // dispatch({type: "NEXT"})
            } else {
                setInputColor("is-error")
                setWordStatus(false)
            }
        }
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
            {challenge.prompt !== undefined ? 
            renderProgressBars()
            :
            null}

            <p id="prompt">
                <span className="nes-text is-success" id="completed-words">{totalInput.join(" ")}</span> <span> </span>
                {wordArr !== null ? wordArr.join(" ") : "...loading"} 
            </p>
            </div>
            <br />
            {/* <Input
                autoFocus
                // compareWord={compareWord}
                setStartTime={setStartTime}
                setTotalInput={setTotalInput}
                setWordStatus={setWordStatus}
                wordArr={wordArr}
                totalInput={totalInput}
                updateProgress={updateProgress}
            /> */}
            <input
                autoFocus 
                className={"nes-input challenge-input " + inputColor} 
                type="text" 
                value={input}
                onChange={handleInput} 
                onKeyPress={compareWord}
            />
            {/* 
            <Motivator wordStatus={wordStatus} loggedInUserId={loggedInUserId} /> */}
        </div>
        )
    }

    const subscribeToChallenge = () => {
        let fetchBody = {user_id: 5}
        loggedInUserId !== null ? fetchBody = {user_id: loggedInUserId} : console.log("anon")
        
        fetch(`http://localhost:3000/challenges/${challenge.uuid}/subscribe`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
    }

    const updateProgress = () => {
        setWordArr(wordArr.slice(1, wordArr.length))
        let fetchBody = {
            user_id: 5,
            progress: totalInput.length + 1,
        }
        loggedInUserId !== null ? fetchBody = {user_id: loggedInUserId, progress: totalInput.length + 1} : console.log("anon")

        fetch(`http://localhost:3000/challenges/${challenge.uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })
    }

    const renderProgressBars = () => {
        return (
            <>
                <ProgressBar
                    value={players.player_one_progress}
                    max={challenge.prompt.length}
                    username={players.player_one}
                />
                <br />
                {players.player_two ? <ProgressBar
                    value={players.player_two_progress}
                    max={challenge.prompt.length}
                    username={players.player_two}
                />:
                null}
            </>
        )
    }

    return (
        <>
            {challenge !== null ?
            <>
                <ActionCableConsumer
                    channel={{channel: 'ChallengesChannel', uuid: challenge.uuid}}
                    // onConnected={subscribeToChallenge}
                    onReceived={(payload) => {
                        setPlayers(payload)
                    }}
                >
                <div className="body-container nes-container is-rounded">
                    {/* {renderProgressBars()} */}
                    {endTime !== null ? <Results renderStats={renderStats} /> : renderChallenge()}
                </div>
                </ActionCableConsumer>
            </> 
            : <div>...loading</div> }
        </>
    );
}

export default ChallengeContainer
