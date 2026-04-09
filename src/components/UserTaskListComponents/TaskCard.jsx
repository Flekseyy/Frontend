// src/App/TaskCard.jsx
import React from 'react';
import '../../styles/Windows/StyleTaskCard.css'; // Проверь путь

export default function TaskCard({ task, onEdit, onDelete }) {

    // Функция для форматирования даты (чтобы было красиво)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',      // <--- ДОБАВИЛИ ЭТУ СТРОКУ (покажет полный год, например 2024)
            // year: '2-digit',   // <--- ИЛИ так, если хочешь кратко (24)
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Определение цвета и иконки для важности
    const getPriorityColor = (p) => {
        if (p === 'high') return '#ff5252'; // Красный
        if (p === 'medium') return '#ffd60a'; // Желтый
        if (p === 'low') return '#38ef7d'; // Зеленый
        return 'rgba(255,255,255,0.3)';
    };

    const priorityColor = getPriorityColor(task.priority);

    return (
        <div className="task-card glass-panel">
            {/* Верхняя часть: Заголовок + Значок важности */}
            <div className="task-header">
                <h3>{task.title}</h3>
                {/* Значок важности в правом верхнем углу */}
                <div
                    className="priority-badge"
                    style={{ backgroundColor: priorityColor }}
                    title={`Важность: ${task.priority}`}
                >
                </div>
            </div>

            {task.description && (
                <p className="task-description">{task.description}</p>
            )}

            <div className="task-footer">
                <div className="task-dates">
                    <span className="task-date-label">Создано:</span>
                    {/* ВОТ ЗДЕСЬ БЫЛА ОШИБКА: Добавили обертку span вокруг даты */}
                    <span className="date-value">{formatDate(task.createdAt)}</span>

                    {task.deadline && (
                        <>
                            <span className="date-separator">&nbsp;</span>
                            <span className="task-date-label">Дедлайн:</span>
                            {/* И здесь тоже добавили обертку */}
                            <span className="date-value">{formatDate(task.deadline)}</span>
                        </>
                    )}
                </div>

                <div className="task-actions">
                    <button className="icon-btn" onClick={() => onEdit(task)}>
                        <img src="https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png" alt="Изменить" />
                    </button>
                    <button className="icon-btn" onClick={() => onDelete(task)}>
                        <img src="https://img.icons8.com/?size=96&id=CzTISLkmHrKE&format=png" alt="Удалить" />
                    </button>
                </div>
            </div>
        </div>
    );
}