import React from 'react'

const ProgressBar = ({value, max, username, wpm, winner}) => {
    return (
        <div className="progressbar">
            {winner && winner === username ? <i className="nes-icon trophy is-large"></i> : null}
            {username}
            {wpm ? `   |   WPM: ${Math.round(wpm * 100) / 100}` : null}
            <progress className="nes-progress is-pattern" value={value} max={max} />
            <br /><br />
        </div>
    )
}

export default ProgressBar