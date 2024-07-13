// backend/routes/questions.js
const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const evaluateDifficulty = require("../services/questionDifficultyEvaluator");

router.post("/generate-question-paper", async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Question.find();

    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions found in the database" });
    }

    const easyQuestions = [];
    const mediumQuestions = [];
    const hardQuestions = [];

    // Evaluate the difficulty of each question
    questions.forEach((question) => {
      const difficulty = evaluateDifficulty(question.text || question.question);
      //question.difficulty = difficulty;

      if (difficulty === "easy") {
        easyQuestions.push(question);
      } else if (difficulty === "medium") {
        mediumQuestions.push(question);
      } else {
        hardQuestions.push(question);
      }
    });

    // Function to get unique random numbers
    function getRandomNumbers(count, min, max) {
      let numbers = [];
      while (numbers.length < count) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      return numbers;
    }

    // Generate the question paper
    const questionPaper = [];
    if (easyQuestions.length > 0) {
      let selectedNumbers = getRandomNumbers(3, 0, easyQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(easyQuestions[i]);
      });
    }

    if (mediumQuestions.length > 0) {
      let selectedNumbers = getRandomNumbers(4, 0, mediumQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(mediumQuestions[i]);
      });
    }

    if (hardQuestions.length > 0) {
      let selectedNumbers = getRandomNumbers(3, 0, hardQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(hardQuestions[i]);
      });
    }

    // Check if the question paper has been generated
    if (questionPaper.length === 0) {
      return res.status(500).json({ error: "Failed to generate question paper" });
    }
    questionPaper.sort(()=>Math.random()-0.5);
    res.json(questionPaper);
  } catch (error) {
    console.error("Error generating question paper:", error);
    res.status(500).json({ error: "Failed to generate question paper" });
  }
});

module.exports = router;
