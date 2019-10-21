import React from 'react';

const ChallengeContainer = ({challenge}) => {

    return (
        <div className="body-container nes-container is-rounded">
            {challenge !== {} ? challenge.id : "...loading"}
        </div>
    );
}

export default ChallengeContainer;
