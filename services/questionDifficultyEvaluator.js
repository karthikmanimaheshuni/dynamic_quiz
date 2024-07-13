// backend/services/questionDifficultyEvaluator.js
const evaluateDifficulty = (questionText) => {
    // Simplified heuristic: classify based on length of the question text
    console.log(questionText);
    const length = questionText.length;
    if (length < 30) return "easy";
    if (length < 50) return "medium";
    return "hard";
  };
  
  module.exports = evaluateDifficulty;
  