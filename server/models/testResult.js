const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model's name is 'User'
        required: true
    },
    answers: [{
        type: Number,
        required: true
    }],
    score: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
