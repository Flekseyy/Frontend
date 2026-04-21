// src/components/TeamComponents/CreateTeamModal.jsx
import React, { useState } from 'react';
import '../../styles/Windows/CommandWindow/StyleCreateTeamWindow.css';
// Импортируем стили кнопок (если они не включены в StyleCreateTeamWindow.css)
import '../../styles/Buttons/StyleTeamButton.css'; // Или FloatingRightButtonAnimation.css

export default function CreateTeamModal({ isOpen, onClose, onSave }) {
    const [teamName, setTeamName] = useState('');
    const [logo, setLogo] = useState(null); // Пока просто заглушка

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamName.trim()) {
            onSave({ name: teamName, logo });
            setTeamName('');
            setLogo(null);
            onClose();
        }
    };

    const handleLogoChange = (e) => {
        // Заглушка: пока просто выводим в консоль
        console.log("Выбран файл:", e.target.files[0]);
        // В будущем здесь будет загрузка изображения
    };

    return (
        <div className="create-team-modal-overlay" onClick={onClose}>
            <div className="create-team-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Создание команды</h2>

                <form onSubmit={handleSubmit}>
                    {/* Поле ввода названия команды */}
                    <input
                        type="text"
                        placeholder="Название команды"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        autoFocus
                    />

                    {/* Поле выбора логотипа (заглушка) */}
                    <div className="logo-upload">
                        <label className="field-label">Логотип команды:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="logo-input"
                        />
                        <p className="logo-hint">(Функция загрузки логотипа в разработке)</p>
                    </div>

                    {/* Кнопки Сохранить / Отмена */}
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