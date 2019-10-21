import React from 'react'

const Motivator = ({wordStatus}) => {
    // const good = ["Wow, that the best you can do?", "My grandma types faster than that!"]
    // const bad = ["I can't believe you can't spell that!", "REALLY?", "Wow, that was pretty bad."]
    // items[Math.floor(Math.random()*items.length)]
    const positiveMessage = () => {
        // return (good[Math.floor(Math.random()*good.length)])
    }

    const negativeMessage = () => {
        // return (bad[Math.floor(Math.random()*bad.length)])
    }

    return (
        <div id="balloony">
            <div className="nes-balloon from-right"> {wordStatus ? positiveMessage() : negativeMessage() } </div>
            <i className="nes-bcrikko chat-bot"></i>
        </div>       
    )
}

export default Motivator