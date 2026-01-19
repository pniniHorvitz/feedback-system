const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// Get analytics by class
router.get('/by-class/:classId', auth, async (req, res) => {
  try {
    const questions = await Question.find({ classId: req.params.classId });
    const questionIds = questions.map(q => q._id);
    
    const responses = await Response.find({
      questionId: { $in: questionIds }
    });
    
    const stats = {
      totalResponses: responses.length,
      totalQuestions: questions.length,
      averageUnderstanding: calculateAverageUnderstanding(responses)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics by teacher
router.get('/by-teacher/:teacherId', auth, async (req, res) => {
  try {
    const questions = await Question.find({ teacherId: req.params.teacherId });
    const questionIds = questions.map(q => q._id);
    
    const responses = await Response.find({
      questionId: { $in: questionIds }
    });
    
    const stats = {
      totalResponses: responses.length,
      totalQuestions: questions.length,
      averageUnderstanding: calculateAverageUnderstanding(responses),
      byClass: groupByClass(responses)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics by subject
router.get('/by-subject/:subject', auth, async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject });
    const questionIds = questions.map(q => q._id);
    
    const responses = await Response.find({
      questionId: { $in: questionIds }
    });
    
    const stats = {
      totalResponses: responses.length,
      averageUnderstanding: calculateAverageUnderstanding(responses),
      byTeacher: groupByTeacher(responses)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics by time period
router.get('/by-period/:startDate/:endDate', auth, async (req, res) => {
  try {
    const start = new Date(req.params.startDate);
    const end = new Date(req.params.endDate);
    
    const questions = await Question.find({
      createdAt: { $gte: start, $lte: end }
    });
    
    const questionIds = questions.map(q => q._id);
    const responses = await Response.find({
      questionId: { $in: questionIds }
    });
    
    const stats = {
      totalResponses: responses.length,
      period: { start, end },
      averageUnderstanding: calculateAverageUnderstanding(responses)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions
function calculateAverageUnderstanding(responses) {
  if (responses.length === 0) return 0;
  
  const understanding = responses.filter(r => r.answer === true || r.answer > 3).length;
  return ((understanding / responses.length) * 100).toFixed(2);
}

function groupByClass(responses) {
  return responses.reduce((acc, resp) => {
    const className = resp.respondentClass;
    if (!acc[className]) {
      acc[className] = { count: 0, understanding: 0 };
    }
    acc[className].count++;
    if (resp.answer === true || resp.answer > 3) {
      acc[className].understanding++;
    }
    return acc;
  }, {});
}

function groupByTeacher(responses) {
  return responses.reduce((acc, resp) => {
    const teacherId = resp.respondentTeacher || 'Unknown';
    if (!acc[teacherId]) {
      acc[teacherId] = { count: 0, understanding: 0 };
    }
    acc[teacherId].count++;
    if (resp.answer === true || resp.answer > 3) {
      acc[teacherId].understanding++;
    }
    return acc;
  }, {});
}

module.exports = router;
