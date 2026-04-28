// src/components/TeamComponents/TeamProfile.jsx
import React, { useState } from 'react'; // Добавили useState
import '../../styles/Windows/CommandWindow/StyleTeamProfile.css';
import '../../styles/Buttons/StyleTeamButton.css';
import '../../styles/CommonUI.css';
import TeamTasksWindow from './TeamTasksWindow'; // <-- Импортируем новое окно

export default function TeamProfile({ teamData, onClose }) {
    // Состояние для открытия окна задач
    const [isTasksOpen, setIsTasksOpen] = useState(false);

    if (!teamData) return null;

    // Если открыто окно задач, рендерим его вместо профиля
    if (isTasksOpen) {
        return (
            <TeamTasksWindow
                teamData={teamData}
                onClose={() => setIsTasksOpen(false)}
            />
        );
    }

    const handleAddMember = () => {
        alert("Функция добавления участника в разработке!");
    };

    return (
        <div className="team-profile-overlay">
            <div className="team-profile-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <div className="team-header-info">
                    <div className="team-logo-container">
                        <img src={teamData.logo} alt="Logo" className="team-logo-img" />
                    </div>
                    <h2 className="team-name-title">{teamData.name}</h2>
                </div>

                <div className="team-stats-placeholder">
                    <p>Участников: 1</p>
                    <p>Задач выполнено: 0</p>
                </div>

                <div className="profile-actions-container">
                    <button className="btn-secondary" onClick={handleAddMember}>
                        <span className="btn-text">+ Участник</span>
                        <img src="https://img.icons8.com/?size=96&id=isUGx8n5CHFi&format=png" alt="Add User" className="btn-icon" />
                        <div className="btn-bg-slide secondary-bg"></div>
                    </button>

                    {/* ИЗМЕНЕНИЕ: Теперь кнопка открывает окно задач */}
                    <button className="btn-secondary" onClick={() => setIsTasksOpen(true)}>
                        <span className="btn-text">Задачи</span>
                        <img src="https://img.icons8.com/?size=96&id=xJ3hLmeSmDWo&format=png" alt="Tasks" className="btn-icon" />
                        <div className="btn-bg-slide secondary-bg"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}