import React, {useState, useEffect} from 'react';

const ChallengeContainer = ({challenge, dispatch}) => {
    const wordArr = challenge.prompt !== undefined ? challenge.prompt.text.split(" ") : null
    const [totalInput, setTotalInput] = useState([])
    const [position, setPosition] = useState(0)
    const [input, setInput] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [loaded, setLoaded] = useState(false)

    const handleInput = (event) => {
        // debugger
        if (totalInput.length === 0 && event.target.value.length === 1) {
            setLoaded(true)
        }
        setInput(event.target.value)
        
    }

    const compareWord = (event) => {
        console.log(input)
        console.log(event.key)

        if (event.key === " ") {
            event.preventDefault()
            const currentWord = wordArr[position]
            if (currentWord === input) {
                setTotalInput([...totalInput, input])
                setInput("")
                setInputColor("is-success")
                dispatch({type: "NEXT"})
            } else {
                setInputColor("is-error")
            }
        }
    }

    const renderProgressBar = () => {
        return (
            <div className="progressbar">
                {challenge.prompt !== undefined ? 
                <progress className="nes-progress is-pattern" value={totalInput.length} max={`${challenge.prompt.length}`} />
                : null }
                <br /><br />
            </div>
        )
    }
    
    return (
        <div className="body-container nes-container is-rounded">
            <div className="challenge">
                {/* <p>{challenge.prompt !== undefined ? challenge.prompt.text : "...loading"}</p> */}
                <div>
                {challenge.prompt !== undefined ? renderProgressBar() : null}
                <p id="prompt">
                    <span className="nes-text is-success" id="completed-words">{totalInput.join(" ")}</span> <span> </span>
                    {challenge.prompt !== undefined ? challenge.prompt.text : "...loading"} 
                </p>
                </div>
                <br />
                <input 
                    className={"nes-input challenge-input " + inputColor} 
                    type="text" 
                    value={input}
                    onChange={handleInput } 
                    onKeyPress={compareWord}
                />
                <div className="nes-balloon from-right" id="balloony"> Welcome to the gnome balloon </div>
            </div>
        </div>
    );
}

export default ChallengeContainer
