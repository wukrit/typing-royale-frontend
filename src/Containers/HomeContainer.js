import React from 'react'
import uuid from 'react-uuid'

const HomeContainer = ({loggedInUserId, fetchNewChallenge, history}) => {

    const createChallenge = (event) => {
        event.preventDefault()
        const newChallengeUuid = uuid()
        const fetchBody = {
            challenge_uuid: newChallengeUuid,
            length: event.target.length.value,
            players: event.target.players.value,
            user_id: loggedInUserId,
        }
        history.push(`/challenge/${newChallengeUuid}`)
        fetchNewChallenge(fetchBody)
    } 
   
    return (
        <div className="body-container nes-container is-rounded">
            <form className="nes-container with-title is-rounded" id="new-challenge" onSubmit={createChallenge}>
                <p className="title">New Challenge</p>
                <div className="challenge-length-radios nes-container is-rounded with-title">
                    <p className="title"> Length </p>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="5" />
                        <span>5</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="50" />
                        <span>50</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="length" value="100" />
                        <span>100</span>
                    </label>
                </div>
                <br/>
                <div className="challenge-length-radios nes-container is-rounded with-title">
                    <p className="title"> Players </p>
                    <label>
                        <input type="radio" className="nes-radio" name="players" value="1" />
                        <span>1</span>
                    </label>
                    <label>
                        <input type="radio" className="nes-radio" name="players" value="2" />
                        <span>2</span>
                    </label>
                </div>
                <br/>
                <button className="nes-btn is-primary"><input type="submit" value="Challenge" /></button>
            </form>
        </div>
    )
}

export default HomeContainer
