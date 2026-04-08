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


            <div className="task-footer">
                <small className="task-date">{new Date(task.createdAt).toLocaleString()}</small>

                <div className="task-actions">
                    <button className="icon" id="edit-btn">
                        <img src="https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png" alt="Изменить" />
                    </button>

                    <button className="icon" id="delete-btn">
                        <img src="https://img.icons8.com/?size=96&id=CzTISLkmHrKE&format=png" alt="Удалить" />
                    </button>
                </div>
            </div>

        </div>
    );
}