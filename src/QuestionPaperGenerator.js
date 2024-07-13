import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example fetch request to generate question paper
    fetchQuestionPaper();
  }, []);

  const fetchQuestionPaper = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-question-paper',{
        easy_percentage:50, medium_percentage:40, hard_percentage:30
      });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      // const contentType = response.headers.get('content-type');
      // if (!contentType || !contentType.includes('application/json')) {
      //   throw new TypeError("Expected JSON response from server");
      // }
      console.log(response.data);
      //const data = await response.json();
      setQuestionPaper(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch question paper. Please check network connection or server availability.');
    }
  };
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Question Paper Generator</h1>
      </header>
      <main className="App-main">
        {error && <p>Error: {error}</p>}
        {questionPaper && (
          <div className="QuestionPaper">
            <h2>Generated Question Paper</h2>
            <ul>
              {questionPaper.map((question, index) => (
                <li key={index}>
                  <h3>{question.text}</h3>
                  <ul>
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
