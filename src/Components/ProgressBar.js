import React from 'react'

const ProgressBar = ({value, max, username, wpm}) => {
    return (
        <div className="progressbar">
            {username}
            <progress className="nes-progress is-pattern" value={value} max={max} />
            {wpm ? Math.round(wpm * 100) / 100 : null}
            <br /><br />
        </div>
    )
}

export default ProgressBar