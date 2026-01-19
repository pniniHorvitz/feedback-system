const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// Get active questions for a class
router.get('/active/:classId', async (req, res) => {
  try {
    const questions = await Question.find({
      classId: req.params.classId,
      isActive: true
    }).populate('teacherId', 'name');
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create question (teacher only)
router.post('/', auth, async (req, res) => {
  try {
    const { text, classId, subject, questionType, options, lessonDate } = req.body;
    
    const question = new Question({
      text,
      teacherId: req.userId,
      classId,
      subject,
      questionType,
      options,
      lessonDate: new Date(lessonDate)
    });
    
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deactivate question
router.patch('/:id/deactivate', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    question.isActive = false;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
