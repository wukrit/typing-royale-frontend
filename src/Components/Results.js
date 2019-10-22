import React from 'react'
import {Link} from 'react-router-dom'

const Results = ({renderStats}) => {

    return (
        <div className="results">
            {renderStats()}
            <Link to="/"><button className="nes-btn is-primary">Home</button></Link>
        </div>
    )

}

export default Results