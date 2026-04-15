// src/App/UserTaskListComponents/TaskCard.jsx

import React from 'react';
import '../../styles/Windows/TaskCard/StyleTaskCard.css';

export default function TaskCard({ task, onEdit, onDelete, onViewDetails }) {


    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);

        // ЕСЛИ ДАТА НЕВАЛИДНА (например, старая строка "4 дек..."), возвращаем пустую строку
        if (isNaN(date.getTime())) {
            // Можно раскомментировать строку ниже, чтобы видеть ошибку в консоли
            // console.warn("Невалидная дата создания:", dateString);
            return '';
        }

        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityColor = (p) => {
        if (p === 'high') return '#ff5252';
        if (p === 'medium') return '#ffd60a';
        if (p === 'low') return '#38ef7d';
        return 'rgba(255,255,255,0.3)';
    };

    const priorityColor = getPriorityColor(task.priority);

    return (
        <div className="task-card glass-panel">
            <div className="task-header">
                <h3>{task.title}</h3>
                <div className="priority-badge" style={{ backgroundColor: priorityColor }}></div>
            </div>

            <div className="task-middle-row">
                <button className="btn-simple-zoom" onClick={() => onViewDetails(task)}>
                    Подробно
                </button>

                <div className="task-actions-vertical">
                    <button className="icon-btn-micro" onClick={() => onEdit(task)} title="Редактировать">
                        <img src="https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png" alt="Изменить" />
                    </button>
                    <button className="icon-btn-micro" onClick={() => onDelete(task)} title="Удалить">
                        <img src="https://img.icons8.com/?size=96&id=CzTISLkmHrKE&format=png" alt="Удалить" />
                    </button>
                </div>
            </div>

            <div className="task-footer-dates">
                <div className="date-row">
                    <span className="task-date-label">Создано:&nbsp;</span>
                    {/* Если дата битая, тут будет пусто */}
                    <span className="date-value">{formatDate(task.createdAt)}</span>
                </div>

                {task.deadline && (
                    <div className="date-row">
                        <span className="task-date-label">Дедлайн:&nbsp;</span>
                        <span className="date-value">{formatDate(task.deadline)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}