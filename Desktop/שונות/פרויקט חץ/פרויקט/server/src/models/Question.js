const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['yes-no', 'scale-1-5', 'multiple-choice', 'open-text'],
    default: 'yes-no'
  },
  options: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lessonDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
