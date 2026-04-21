import React from 'react';
import '../../styles/Windows/StyleAddTaskWindow.css';
import '../../styles/Animation/FloatingRightButtonAnimation.css';

export default function DeleteTaskModal({ task, isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <h2>Удалить задачу?</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '20px' }}>
                    Вы уверены, что хотите удалить "<strong>{task.title}</strong>"?
                </p>

                <div className="modal-buttons">
                    <button className="btn-cancel" onClick={onConfirm} style={{ borderColor: '#d9534f' }}>
                        <span className="btn-text">Удалить</span>
                        <img src="https://img.icons8.com/?size=100&id=3062&format=png" alt="Delete" className="btn-icon" />
                        <div className="btn-bg-slide" style={{ backgroundColor: '#d9534f' }}></div>
                    </button>

                    <button className="btn-cancel" onClick={onClose}>
                        <span className="btn-text">Отмена</span>
                        <img src="https://img.icons8.com/?size=100&id=3062&format=png" alt="Cancel" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}