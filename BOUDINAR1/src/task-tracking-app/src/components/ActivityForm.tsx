import React, { useState } from 'react';
import { startActivity } from '../services/api';

const ActivityForm: React.FC = () => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (description.trim()) {
            await startActivity(description);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter activity description"
                required
            />
            <button type="submit">Start Activity</button>
        </form>
    );
};

export default ActivityForm;