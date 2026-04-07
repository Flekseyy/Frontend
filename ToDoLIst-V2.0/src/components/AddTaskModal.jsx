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
                        <button type="submit" className="btn-save">Сохранить</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
}