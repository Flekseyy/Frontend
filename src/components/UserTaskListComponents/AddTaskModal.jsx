import React, { useState } from 'react';

import '../../styles/Windows/StyleAddTaskWindow.css';
import '../../styles/Buttons/StyleAddTaskButton.css';
import '../../styles/CommonUI.css';

export default function AddTaskModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(null);
    const [deadline, setDeadline] = useState('');

    const [errorTitle, setErrorTitle] = useState('');
    const [errorPriority, setErrorPriority] = useState('');
    const [errorDeadline, setErrorDeadline] = useState('');

    if (!isOpen) return null;

    const clearErrors = () => {
        setErrorTitle('');
        setErrorPriority('');
        setErrorDeadline('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        if (!title.trim()) {
            setErrorTitle('Введите название задачи');
            isValid = false;
        }

        if (!priority) {
            setErrorPriority('Выберите важность');
            isValid = false;
        }

        if (!deadline) {
            setErrorDeadline('Укажите дедлайн');
            isValid = false;
        }

        if (isValid) {
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

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <h2>Новая задача</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <div className="field-wrapper">
                        <input
                            type="text"
                            placeholder="Название задачи"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (errorTitle) setErrorTitle('');
                            }}
                            className={errorTitle ? 'input-error' : ''}
                            autoFocus
                        />
                        {errorTitle && <span className="error-message">{errorTitle}</span>}
                    </div>

                    <div className="field-wrapper">
                        <textarea
                            placeholder="Описание (необязательно)"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            className="resizable-textarea"
                        />
                    </div>

                    <div className="priority-selector field-wrapper">
                        <label className="field-label">Важность:</label>
                        <div className="priority-options-row">
                            <button
                                type="button"
                                className={`priority-text-btn low-btn ${priority === 'low' ? 'active' : ''}`}
                                onClick={() => {
                                    setPriority('low');
                                    if (errorPriority) setErrorPriority('');
                                }}
                            >
                                <span className="btn-text-inner">Низкая</span>
                                <div className="btn-bg-slide low-bg"></div>
                            </button>

                            <button
                                type="button"
                                className={`priority-text-btn medium-btn ${priority === 'medium' ? 'active' : ''}`}
                                onClick={() => {
                                    setPriority('medium');
                                    if (errorPriority) setErrorPriority('');
                                }}
                            >
                                <span className="btn-text-inner">Средняя</span>
                                <div className="btn-bg-slide medium-bg"></div>
                            </button>

                            <button
                                type="button"
                                className={`priority-text-btn high-btn ${priority === 'high' ? 'active' : ''}`}
                                onClick={() => {
                                    setPriority('high');
                                    if (errorPriority) setErrorPriority('');
                                }}
                            >
                                <span className="btn-text-inner">Высокая</span>
                                <div className="btn-bg-slide high-bg"></div>
                            </button>
                        </div>
                        {errorPriority && <span className="error-message">{errorPriority}</span>}
                    </div>

                    <div className="deadline-selector field-wrapper">
                        <label className="field-label">Дедлайн:</label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => {
                                setDeadline(e.target.value);
                                if (errorDeadline) setErrorDeadline('');
                            }}
                            className={`deadline-input ${errorDeadline ? 'input-error' : ''}`}
                        />
                        {errorDeadline && <span className="error-message">{errorDeadline}</span>}
                    </div>

                    <div className="modal-buttons">
                        <button 
                            type="submit" 
                            className="btn-save"
                            style={{ border: '1px solid rgba(56, 239, 125, 0.4)' }}
                        >
                            <span className="btn-text">Сохранить</span>
                            <img src="https://img.icons8.com/?size=96&id=GqJpEbXPcmLg&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={onClose}
                            style={{ border: '1px solid rgba(26, 25, 25)' }}
                        >
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