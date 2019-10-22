import React from 'react'

const Results = ({renderStats}) => {

    return (
        <div className="results">
            {renderStats()}
        </div>
    )

}

export default Results