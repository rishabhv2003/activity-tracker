import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [openActivityId, setOpenActivityId] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await Axios.get("http://localhost:5000/getActivities");
                console.log("activities:", response.data);
                const formattedActivities = response.data.map(activity => ({
                    ...activity,
                    startDate: formatDate(activity.startDate),
                    endDate: formatDate(activity.endDate)
                }));
                setActivities(formattedActivities);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const toggleDrawer = (activityId) => {
        setOpenActivityId(openActivityId === activityId ? null : activityId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    return (
        <div className="max-w-xl mx-auto mt-4">
            <h1 className="w-full text-2xl font-bold mb-4 text-center">Activities</h1>
            <ul>
                {activities.map(activity => (
                    <li key={activity._id} className="text-lg mb-2">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDrawer(activity._id)}>
                            <span>
                                {activity.activityName} - {activity.startDate} to {activity.endDate}
                            </span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {openActivityId === activity._id ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                )}
                            </svg>
                        </div>
                        {openActivityId === activity._id && (
                            <div className="bg-white rounded-md p-4 mt-2 shadow">
                                <ul>
                                    {activity.milestones.map((milestone, index) => (
                                        <li key={index} className="text-base">
                                            <span className="ml-2 text-black">{milestone}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Activity;
