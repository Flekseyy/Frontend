// src/App/AddTaskModal.jsx
import React, { useState } from 'react';
import '../styles/StyleAddTaskWindow.css'; // Стили берем оттуда же

export default function AddTaskModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null; // Если окно закрыто, ничего не рендерим

    const handleSubmit = (e) => {
        e.preventDefault(); // Чтобы страница не перезагружалась
        if (title.trim()) {
            onSave({ title, description }); // Передаем данные наверх
            setTitle('');
            setDescription('');
            onClose(); // Закрываем окно
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
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
                    <div className="modal-buttons">
                        {/* Кнопка Сохранить */}
                        <button type="submit" className="btn-save">
                            <span className="btn-text">Сохранить</span>
                            <img
                                src="https://img.icons8.com/?size=100&id=1501&format=png"
                                alt="Check"
                                className="btn-icon"
                            />
                            <div className="btn-bg-slide"></div>
                        </button>

                        {/* Кнопка Отмена */}
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            <span className="btn-text">Отмена</span>
                            <img
                                src="https://img.icons8.com/?size=100&id=3062&format=png"
                                alt="Cancel"
                                className="btn-icon"
                            />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}