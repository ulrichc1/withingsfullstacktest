import React, { useState, useEffect } from 'react';

const Question = (props) => {
    const [selected, setSelected] = useState(null); // Selected Answer


const handleClick = () => {
    // Check if an answer is selected and call the next question then
    if (selected === null) {
        alert("Please select an answer !");
        return;
    } else {
        props.nextQuestion();
    }
    // Highlights the correct answer
    if (selected === props.selectedAnswer) {
        document.querySelector(".question-answers p:nth-child(" + (props.selectedAnswer + 1) + ")").classList.add("correct");
    }
};

// Reset selected answer when a new question is shown
useEffect(() => {
    setSelected(null);
}, [props.question]);

return (
    <div className="question-container">
        <p>{props.question}</p>
        <div className="question-answers">
            <p onClick={() => setSelected(0)}>Answer 1</p>
            <p onClick={() => setSelected(1)}>Answer 2</p>
            <p onClick={() => setSelected(2)}>Answer 3</p>
            <p onClick={() => setSelected(3)}>Answer 4</p>
        </div>
        <button onClick={handleClick}>Validate</button>
    </div>
)

}


export default Question;