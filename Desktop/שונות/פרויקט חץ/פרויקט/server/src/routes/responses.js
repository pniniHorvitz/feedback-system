const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Question = require('../models/Question');

// Submit response (anonymous)
router.post('/', async (req, res) => {
  try {
    const { questionId, answer, respondentClass, respondentSubject, respondentTeacher, sessionId } = req.body;
    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const response = new Response({
      questionId,
      answer,
      respondentClass,
      respondentSubject,
      respondentTeacher,
      sessionId
    });
    
    await response.save();
    res.status(201).json({ message: 'Response recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get responses for a question
router.get('/question/:questionId', async (req, res) => {
  try {
    const responses = await Response.find({
      questionId: req.params.questionId
    });
    
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
