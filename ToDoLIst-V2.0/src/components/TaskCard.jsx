import React from 'react';
import '../styles/StyleTaskCard.css';

export default function TaskCard({ task }) {
    return (
        <div className="task-card glass-panel">
            <div className="task-header">
                <h3>{task.title}</h3>
            </div>
            {task.description && (
                <p className="task-description">{task.description}</p>
            )}
            <small className="task-date">{new Date(task.createdAt).toLocaleString()}</small>
        </div>
    );
}