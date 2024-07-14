import React, { useState } from 'react';
import './QuestionPaperGenerator.css';

const QuestionComponent = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setIsCorrect(option === question.correct_answer);
  };

  return (
    <div className="question-block">
      <p className="question-text">{question.text}</p>
      <div className="options-container">
        {question.options.map((option, i) => (
          <button
            key={i}
            className={`option-button ${
              selectedAnswer === option
                ? isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <p className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </p>
      )}
    </div>
  );

};

export default QuestionComponent;
