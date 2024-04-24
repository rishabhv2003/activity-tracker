const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Activity = require('./models/Activity'); 
require('dotenv').config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/getData', (req, res) => {
    console.log("request");
    res.send("Hello");
});

app.get('/getActivities', async (req, res) => {
    try {
       
        const activities = await Activity.find();
        console.log(activities.milestones);
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/submitData', async (req, res) => {
    try {
        const { activityName, startDate, endDate, milestones } = req.body;
        const newActivity = new Activity({
            activityName,
            startDate,
            endDate,
            milestones
        });
        await newActivity.save();
        console.log(req.body)
        res.status(200).json({ message: 'Activity submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
