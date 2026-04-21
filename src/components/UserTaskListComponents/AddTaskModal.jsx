import React, { useState } from 'react';

import '../../styles/Windows/StyleAddTaskWindow.css';
import '../../styles/Buttons/StyleAddTaskButton.css';

export default function AddTaskModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Изменили на null, чтобы ни одна кнопка не была активна по умолчанию
    const [priority, setPriority] = useState(null);
    const [deadline, setDeadline] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!priority) {
            alert("Выберите важность задачи!");
            return;
        }
        if (title.trim()) {
            onSave({ title, description, priority, deadline });
            setTitle('');
            setDescription('');
            setPriority(null);
            setDeadline('');
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Новая задача</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название задачи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                    />
                    <textarea
                        placeholder="Описание (необязательно)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Выбор важности с новой структурой */}
                    <div className="priority-selector">
                        <label className="field-label">Важность:</label>
                        <div className="priority-options-row">

                            <button
                                type="button"
                                className={`priority-text-btn low-btn ${priority === 'low' ? 'active' : ''}`}
                                onClick={() => setPriority('low')}
                            >
                                <span className="btn-text-inner">Низкая</span>
                                <div className="btn-bg-slide low-bg"></div>
                            </button>

                            {/* Кнопка: Средняя */}
                            <button
                                type="button"
                                className={`priority-text-btn medium-btn ${priority === 'medium' ? 'active' : ''}`}
                                onClick={() => setPriority('medium')}
                            >
                                <span className="btn-text-inner">Средняя</span>
                                <div className="btn-bg-slide medium-bg"></div>
                            </button>

                            {/* Кнопка: Высокая */}
                            <button
                                type="button"
                                className={`priority-text-btn high-btn ${priority === 'high' ? 'active' : ''}`}
                                onClick={() => setPriority('high')}
                            >
                                <span className="btn-text-inner">Высокая</span>
                                <div className="btn-bg-slide high-bg"></div>
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

                    <div className="modal-buttons">
                        <button type="submit" className="btn-save">
                            <span className="btn-text">Сохранить</span>
                            <img src="https://img.icons8.com/?size=100&id=1501&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            <span className="btn-text">Отмена</span>
                            <img src="https://img.icons8.com/?size=100&id=3062&format=png" alt="Cancel" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}