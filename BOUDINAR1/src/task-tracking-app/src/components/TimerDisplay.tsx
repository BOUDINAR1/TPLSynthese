import React from 'react';

interface TimerDisplayProps {
    elapsedTime: number; // Time in seconds
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ elapsedTime }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>Elapsed Time</h2>
            <p>{formatTime(elapsedTime)}</p>
        </div>
    );
};

export default TimerDisplay;