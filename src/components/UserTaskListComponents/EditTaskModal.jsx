// src/App/EditTaskModal.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/Windows/StyleAddTaskWindow.css'; // Используем те же стили
import '../../styles/Animation/FloatingRightButtonAnimation.css';
import '../../styles/CommonUI.css';

export default function EditTaskModal({ task, isOpen, onClose, onSave }) {
    // Состояния для всех полей
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium'); // По умолчанию средняя, но перезапишется в useEffect
    const [deadline, setDeadline] = useState('');

    // Заполняем поля данными задачи при открытии
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setPriority(task.priority || 'medium');
            // Форматируем дату для input type="datetime-local" (нужен формат YYYY-MM-DDTHH:mm)
            if (task.deadline) {
                const dateObj = new Date(task.deadline);
                // Корректируем часовой пояс, чтобы дата не ушла на день назад/вперед
                const offset = dateObj.getTimezoneOffset() * 60000;
                const localISOTime = (new Date(dateObj - offset)).toISOString().slice(0, 16);
                setDeadline(localISOTime);
            } else {
                setDeadline('');
            }
        }
    }, [task, isOpen]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSave({
                ...task,
                title,
                description,
                priority,
                deadline,
                updatedAt: new Date().toLocaleString()
            });
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <h2>Редактировать задачу</h2>
                <form onSubmit={handleSubmit}>
                    {/* Название */}
                    <input
                        type="text"
                        placeholder="Название задачи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                    />

                    {/* Описание */}
                    <textarea
                        placeholder="Описание (необязательно)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Выбор важности (Такая же структура, как в AddTaskModal) */}
                    <div className="priority-selector">
                        <label className="field-label">Важность:</label>
                        <div className="priority-options-row">

                            <button
                                type="button"
                                className={`priority-text-btn low-btn ${priority === 'low' ? 'active' : ''}`}
                                onClick={() => setPriority('low')}
                            >
                                <span className="btn-text-inner">Низкая</span>
                            </button>

                            <button
                                type="button"
                                className={`priority-text-btn medium-btn ${priority === 'medium' ? 'active' : ''}`}
                                onClick={() => setPriority('medium')}
                            >
                                <span className="btn-text-inner">Средняя</span>
                            </button>

                            <button
                                type="button"
                                className={`priority-text-btn high-btn ${priority === 'high' ? 'active' : ''}`}
                                onClick={() => setPriority('high')}
                            >
                                <span className="btn-text-inner">Высокая</span>
                            </button>

                        </div>
                    </div>

                    {/* Выбор дедлайна */}
                    <div className="deadline-selector">
                        <label className="field-label">Дедлайн:</label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="deadline-input"
                        />
                    </div>

                    {/* Кнопки */}
                    <div className="modal-buttons">
                        <button type="submit" className="btn-save">
                            <span className="btn-text">Сохранить</span>
                            <img src="https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>

                        <button type="button" className="btn-cancel" onClick={onClose}>
                            <span className="btn-text">Отмена</span>
                            <img src="https://img.icons8.com/?size=96&id=DXECg4JU1n2x&format=png" alt="Cancel" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}