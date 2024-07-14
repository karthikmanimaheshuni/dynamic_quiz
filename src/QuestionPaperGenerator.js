import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionComponent from './QuestionComponent';
import './QuestionPaperGenerator.css';

const QuestionPaperGenerator = () => {
  const [questionPaper, setQuestionPaper] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestionPaper();
  }, []);

  const fetchQuestionPaper = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-question-paper', {
        easy_percentage: 50,
        medium_percentage: 40,
        hard_percentage: 30
      });
      setQuestionPaper(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch question paper. Please check network connection or server availability.');
    }
  };

  return (
    <div className="question-container">
      {error && <p className="error-message">{error}</p>}
      {questionPaper.map((question, index) => (
        <QuestionComponent key={index} question={question} />
      ))}
    </div>
  );
};

export default QuestionPaperGenerator;
