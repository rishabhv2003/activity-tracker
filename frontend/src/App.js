import React, { useState } from 'react';
import Axios from 'axios';
import Activity from './components/Activity';
function App() {
  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneInput, setMilestoneInput] = useState('');

  const handleActivityNameChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleMilestoneInputChange = (event) => {
    setMilestoneInput(event.target.value);
  };

  const handleAddMilestone = () => {
    if (milestoneInput.trim() !== '') {
      setMilestones([...milestones, milestoneInput.trim()]);
      setMilestoneInput('');
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:5000/submitData", {
        activityName,
        startDate,
        endDate,
        milestones
      });
      console.log(response.data);
    
      setActivityName('');
      setStartDate('');
      setEndDate('');
      setMilestones([]);
      setMilestoneInput('');

      alert('Data has been saved successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div>
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Activities</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="activityName" className="block text-sm font-medium text-gray-400">Activity Name</label>
              <input
                type="text"
                id="activityName"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                value={activityName}
                onChange={handleActivityNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-400">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-400">End Date</label>
              <input
                type="date"
                id="endDate"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                value={endDate}
                onChange={handleEndDateChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="milestone" className="block text-sm font-medium text-gray-400">Milestones</label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="milestone"
                  className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  value={milestoneInput}
                  onChange={handleMilestoneInputChange}
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md"
                  onClick={handleAddMilestone}
                >
                  +
                </button>
              </div>
            </div>
            {milestones.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Milestones</label>
                <ul>
                  {milestones.map((milestone, index) => (
                    <li key={index} className="text-white">{milestone}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          <Activity />
        </div>
      </div>
    </div>
  );
}

export default App;
