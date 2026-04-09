import React, { useState } from 'react';
import '../../styles/Windows/CommandWindow/StyleTeamStartWindow.css';
import '../../styles/Buttons/StyleTeamButton.css';
import '../../styles/CommonUI.css';

import CreateTeamWindow from './CreateTeamWindow';
import TeamProfile from './TeamProfile';

export default function TeamStartWindow({ isOpen, onClose }) {
    // Храним массив всех команд
    const [teams, setTeams] = useState([]);

    // Текущая выбранная команда (для отображения профиля)
    const [currentTeam, setCurrentTeam] = useState(null);

    // Состояние для открытия окна создания новой команды
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    if (!isOpen) return null;

    // Логика сохранения новой команды
    const handleSaveTeam = (newTeam) => {
        setTeams([...teams, newTeam]); // Добавляем в общий список
        setCurrentTeam(newTeam);       // Сразу переходим в профиль этой команды
        setIsCreateOpen(false);        // Закрываем окно создания
    };

    // Логика выбора команды из списка
    const handleSelectTeam = (team) => {
        setCurrentTeam(team);
    };

    // Возврат из профиля к списку
    const handleBackToList = () => {
        setCurrentTeam(null);
    };

    // Заглушка для кнопки "Задачи"
    const handleTasks = () => {
        alert("Раздел задач в разработке!");
    };

    // --- УСЛОВНЫЙ РЕНДЕРИНГ ---

    // 1. Если открыто окно создания -> рендерим CreateTeamWindow
    if (isCreateOpen) {
        return (
            <CreateTeamWindow
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleSaveTeam}
            />
        );
    }

    // 2. Если выбрана конкретная команда -> рендерим Профиль
    if (currentTeam) {
        return (
            <TeamProfile
                teamData={currentTeam}
                onTasks={handleTasks}
                onClose={handleBackToList}
            />
        );
    }

    // 3. По умолчанию -> рендерим СПИСОК КОМАНД и кнопку "Создать"
    return (
        <div className="team-list-overlay" onClick={onClose}>
            <div className="team-list-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Мои команды</h2>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                {/* Контейнер со скроллом для списка */}
                <div className="teams-scroll-container">
                    {teams.length === 0 ? (
                        <p className="empty-message">У вас пока нет команд.</p>
                    ) : (
                        teams.map((team, index) => (
                            <div
                                key={index}
                                className="team-item"
                                onClick={() => handleSelectTeam(team)}
                            >
                                <div className="team-item-logo">
                                    <img src={team.logo} alt={team.name} />
                                </div>
                                <span className="team-item-name">{team.name}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Кнопка создания новой команды (всегда внизу) */}
                <div className="list-actions-container">
                    <button className="btn-create-team-small" onClick={() => setIsCreateOpen(true)}>
                        <span className="btn-text">Создать команду</span>
                        <img src="https://img.icons8.com/?size=96&id=Y0LmisQTNVSH&format=png    " alt="Plus" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}