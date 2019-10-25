import React, {useState, useEffect} from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import ProgressBar from '../Components/ProgressBar'
import API from '../Config/API'
import { debounce, throttle } from 'lodash'
// import Motivator from '../Components/Motivator'
// import Results from '../Components/Results'


const ChallengeContainer = ({username, loggedInUserId, postResults}) => {
    
    const [challenge, setChallenge] = useState(null)
    const [wordArr, setWordArr] = useState(null)
    const [totalInput, setTotalInput] = useState([])
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState(null)
    const [input, setInput] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [subscribed, setSubscribed] = useState(false)
    const [players, setPlayers] = useState({})
    const [done, setDone] = useState(false)

    useEffect(
        () => {
            const urlArr = window.location.href.split("/")
            const slug = urlArr[urlArr.length - 1]
            if (challenge === null) {
                fetch(`${API}/challenges/${slug}`)
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
        setInput(event.target.value.toLowerCase())       
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
            } else {
                setInputColor("is-error")
            }
        }
    }

    const renderStats = () => {
        if (done === false) {
            let user_id = null
            loggedInUserId ? user_id = loggedInUserId : user_id = 5
            const time = (endTime - startTime) / 1000
            const words = totalInput.join(" ")
            const wpm = (words.length / 5) / (time / 60)
            const fetchBody = {
                user_id: user_id,
                wpm: wpm,
                uuid: challenge.uuid
            }
            fetch(`${API}/challenges/${challenge.uuid}/results`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchBody)
            })
            setDone(true)
        }
        return (
            renderChallenge()
        )
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
            <input
                autoFocus 
                autoComplete="off"
                className={"nes-input challenge-input " + inputColor} 
                type="text" 
                value={input}
                onChange={handleInput} 
                onKeyPress={compareWord}
            />
             
            {/* <Motivator wordStatus={wordStatus} loggedInUserId={loggedInUserId} /> */}
        </div>
        )
    }

    const subscribeToChallenge = () => {
        let fetchBody = {user_id: 5}
        loggedInUserId !== null ? fetchBody = {user_id: loggedInUserId} : console.log("anon")
        
        fetch(`${API}/challenges/${challenge.uuid}/subscribe`, {
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

        debouncedFetch(fetchBody)
    }

    const debouncedFetch = debounce((fetchBody) => patchProgressFetch(fetchBody), 1000)

    const patchProgressFetch = (fetchBody) => {
        fetch(`${API}/challenges/${challenge.uuid}`, {
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
                    color="is-primary"
                    value={players.player_one_progress}
                    max={challenge.prompt.length}
                    username={players.player_one}
                    wpm={players.player_one_wpm}
                    winner={players.winner_name}
                />
                <br />
                {players.player_two ? <ProgressBar
                    color="is-success"
                    value={players.player_two_progress}
                    max={challenge.prompt.length}
                    username={players.player_two}
                    wpm={players.player_two_wpm}
                    winner={players.winner_name}
                />:
                null}
            </>
        )
    }

    const debouncedSetPlayers = debounce((payload) => setPlayers(payload), 500)

    return (
        <>
            {challenge !== null ?
            <>
                <ActionCableConsumer
                    channel={{channel: 'ChallengesChannel', uuid: challenge.uuid}}
                    // onConnected={subscribeToChallenge}
                    onReceived={(payload) => {
                        debouncedSetPlayers(payload)
                    }}
                >
                <div className="body-container nes-container is-rounded">
                    {/* {renderProgressBars()} */}
                    {endTime ? renderStats() : renderChallenge()}
                </div>
                </ActionCableConsumer>
            </> 
            : <div>...loading</div> }
        </>
    );
}

export default ChallengeContainer
