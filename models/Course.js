const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    videoUrl: {
        type: String
    },
    thumbnail: {
        type: String
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', CourseSchema); 