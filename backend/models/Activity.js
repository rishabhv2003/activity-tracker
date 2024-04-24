const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    milestones: {
        type: [String],
        default: []
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
