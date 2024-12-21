import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import TimerDisplay from './components/TimerDisplay';
import ActivityForm from './components/ActivityForm';
import { startActivity } from './services/api';

const App = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [activityDescription, setActivityDescription] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const ongoingActivity = JSON.parse(localStorage.getItem('ongoingActivity') || 'null');
        if (ongoingActivity) {
            setActivityDescription(ongoingActivity.description);
            setIsActive(true);
            const startTime = ongoingActivity.startTime;
            const interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    const handleStartActivity = async (description) => {
        setActivityDescription(description);
        setIsActive(true);
        const startTime = Date.now();
        localStorage.setItem('ongoingActivity', JSON.stringify({ description, startTime }));
        await startActivity(description);
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    };

    return (
        <div>
            <h1>Task Tracking App</h1>
            <ActivityForm onStartActivity={handleStartActivity} />
            {isActive && <TimerDisplay elapsedTime={elapsedTime} />}
            <Button label="Start Task" onClick={() => handleStartActivity(activityDescription)} />
        </div>
    );
};

export default App;