// src/components/TeamComponents/ConfirmMoveModal.jsx
import React from 'react';
import '../../styles/Windows/StyleAddTaskWindow.css'; // Используем стили кнопок
import '../../styles/CommonUI.css';

export default function ConfirmMoveModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Подтверждение</h2>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', margin: '20px 0' }}>
                    {message}
                </p>

                <div className="modal-buttons">
                    {/* Кнопка ДА (стиль btn-save) */}
                    <button className="btn-save" onClick={onConfirm}>
                        <span className="btn-text">Да</span>
                        <img src="https://img.icons8.com/?size=96&id=2WnpVEXfzAbC&format=png" alt="Check" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>

                    {/* Кнопка НЕТ (стиль btn-cancel) */}
                    <button className="btn-cancel" onClick={onCancel}>
                        <span className="btn-text">Нет</span>
                        <img src="https://img.icons8.com/?size=96&id=DXECg4JU1n2x&format=png" alt="Cancel" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}