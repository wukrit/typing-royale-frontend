import React from 'react'
import { Link } from 'react-router-dom'

const HomeContainer = (props) => {
   
    return (
        <div className="body-container nes-container is-rounded">
            <Link to="/challenge">
                <button className="nes-btn is-primary" >Challenge</button>
            </Link>
        </div>
    )
}

export default HomeContainer
