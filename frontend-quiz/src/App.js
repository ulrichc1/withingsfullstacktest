import React, { useState, useEffect } from 'react';
import Question from './Question';

const App = () => {
	// States
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [score, setScore] = useState(0);
	
	// Promise : Getting 5 Questions from the Trivia API
	const fetchQuestions = async () => {
		const response = await fetch('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy'); // TODO: do the API call to Triva here
		const data = await response.json();
		setQuestions(data.results);
		setCurrentQuestion(data.results[0]);
	};


	// Scoring system 
	const nextQuestion = (selectedAnswer) => {
		const isCorrect = selectedAnswer === currentQuestion.correct_answer;
		if (isCorrect) {
		  setScore(score + 1); // If the answer is correct, we increment the score.
		}

	// We go to the next question
	const nextQuestionIndex = questions.indexOf(currentQuestion) + 1;
    const nextQuestion = questions[nextQuestionIndex];
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert(`The Quizz is over! Your score : ${score} out of ${questions.length}.`);
      setQuestions([]);
      setCurrentQuestion(null);
      setScore(0);
    }

  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Trivia Quiz</h1>
      </div>

      <div className="App-content">
        {currentQuestion ? (
          <Question 
            question={currentQuestion}
            nextQuestion={nextQuestion}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;