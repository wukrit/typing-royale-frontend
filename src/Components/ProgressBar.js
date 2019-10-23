import React from 'react'

const ProgressBar = ({value, max, username}) => {
    return (
        <div className="progressbar">
            {username}
            <progress className="nes-progress is-pattern" value={value} max={max} />
            <br /><br />
        </div>
    )
}

export default ProgressBar