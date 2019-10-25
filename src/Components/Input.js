import React, {useState} from 'react';

const Input = ({totalInput, wordArr, updateProgress, setStartTime, setTotalInput, setWordStatus}) => {

    
    const [inputColor, setInputColor] = useState("")

    const handleInput = (event) => {
        // debugger
        if (totalInput.length === 0 && event.target.value.length === 1) {
            setStartTime(new Date())
        }
        localStorage.setItem("input", localStorage.getItem("input") + event.target.value)    
    }

    const handleCompare = (event) => {
        if (event.key === " ") {
            event.preventDefault()
            compareWord(localStorage.getItem("input"))
        }
    }

    const compareWord = (input) => {
        const currentWord = wordArr[0]
        if (currentWord === input) {
            setTotalInput([...totalInput, localStorage.getItem("input")])
            localStorage.setItem("input", "")
            setInputColor("is-success")
            updateProgress()
        } else {
            setInputColor("is-error")
            // setWordStatus(false)
        }
    }

    return (
        <input
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                autoFocus 
                className={"nes-input challenge-input " + inputColor} 
                type="text" 
                value={localStorage.getItem("input") !== null? localStorage.getItem("input") : ""}
                onChange={handleInput} 
                onKeyPress={handleCompare}
        />
    );
}

export default Input;
