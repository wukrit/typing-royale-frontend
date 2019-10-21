import React, {useState, useEffect} from 'react';

const ChallengeContainer = ({challenge}) => {
    const [wordArr, setWordArr] = useState([])
    const [totalInput, setTotalInput] = useState([])
    const [input, setInput] = useState("")

    const handleInput = (event) => {
        setInput(event.target.value)
    }

    const compareLetter = (event) => {
        console.log(input)
        console.log(event.key)
        if (event.key === " ") {
            event.preventDefault()
            setInput("")
            setTotalInput([...totalInput, input])
            return false 
        }
    }

    return (
        <div className="body-container nes-container is-rounded">
            <div className="challenge">
                {/* <p>{challenge.prompt !== undefined ? challenge.prompt.text : "...loading"}</p> */}
                <p>{challenge.prompt !== undefined ? challenge.prompt.text : "...loading"} </p>
                <br />
                <form className="challenge-input">
                    <input 
                        className="nes-input challenge-input" 
                        type="text" 
                        value={input}
                        onChange={handleInput } 
                        onKeyPress={compareLetter}
                    />
                </form>
            </div>
        </div>
    );
}

export default ChallengeContainer;
