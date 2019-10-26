import React, { useState} from 'react'
import uuid from 'react-uuid'

const HomeContainer = ({loggedInUserId, fetchNewChallenge, history}) => {

    const [error, setError] = useState()

    const createChallenge = (event) => {
        event.preventDefault()
        if (event.target.length.value) {
            let players = null
            event.target.players.value ? players = event.target.players.value : players = 1
            const newChallengeUuid = uuid()
            const fetchBody = {
                challenge_uuid: newChallengeUuid,
                length: event.target.length.value,
                players: players,
                user_id: loggedInUserId,
            }
            history.push(`/challenge/${newChallengeUuid}`)
            fetchNewChallenge(fetchBody)
        } else {
            setError(true)
        }
    }

    const displayAlert = (message) => {
        return (
            <dialog className="nes-dialog" id="dialog-default">
                <form method="dialog">
                <p className="title">Error</p>
                <p>{message}</p>
                <menu className="dialog-menu">
                    <button className="nes-btn is-primary" onClick={() => setError(false)}>Ok</button>
                </menu>
                </form>
            </dialog>
        )
    }

    return (
        <div className="body-container nes-container is-rounded">
            {error ? displayAlert() : null}
            <form className="nes-container with-title is-rounded" id="new-challenge" onSubmit={createChallenge}>
                <p className="title">New Challenge</p>
                <div className="challenge-length-radios nes-container is-rounded with-title">
                    <p className="title"> Length </p>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="5" />
                        <span>5</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="25" />
                        <span>25</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="50" />
                        <span>50</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="75" />
                        <span>75</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="100" />
                        <span>100</span>
                    </label>
                </div>
                <br/>
                <div className="challenge-length-radios nes-container is-rounded with-title" id="num-players">
                    <p className="title"> Players </p>
                    <label>
                        <input type="radio" className="nes-radio" name="players" value="1" />
                        <span>1</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="players" value="2" />
                        <span>2</span>
                    </label>
                    <label className="desktop-only">
                        <input type="radio" className="nes-radio" name="players" value="3" />
                        <span>3</span>
                    </label>
                    <label className="desktop-only">
                        <input type="radio" className="nes-radio" name="players" value="4" />
                        <span>4</span>
                    </label>
                </div>
                <br/>
                <button className="nes-btn is-success" id="new-chall-button"><input type="submit" value="Challenge" /></button>
            </form>
            <div className="nes-container with-title is-rounded" id="instructions">
                <p className="title">Instructions</p>
                <ol>
                    <li>
                        1. Create a new challenge
                    </li>
                    <br />
                    <li>
                        2. Once the challenge appears, send the link to your opponent
                    </li>
                    <br />
                    <li>
                        3. Coordinate a start time
                    </li>
                    <br />
                    <li>
                        4. Type!
                    </li>
                </ol>
        </div>
        </div>
    )
}

export default HomeContainer
