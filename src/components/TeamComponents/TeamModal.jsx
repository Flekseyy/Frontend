// src/components/TeamComponents/TeamModal.jsx
import React, { useState } from 'react';
import '../../styles/Windows/CommandWindow/StyleTeamMenu.css';
import '../../styles/Windows/CommandWindow/StyleTeamMenu.css';
import CreateTeamModal from './CreateTeamModal'; // <-- Импортируем новое окно

export default function TeamModal({ isOpen, onClose }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false); // <-- Состояние для окна создания

    if (!isOpen) return null;

    const handleOpenCreate = () => {
        setIsCreateOpen(true);
    };

    const handleSaveTeam = (newTeam) => {
        console.log("Новая команда:", newTeam);
        // Здесь будет логика сохранения команды
        alert(`Команда "${newTeam.name}" создана!`);
        setIsCreateOpen(false);
    };

    return (
        <>
            <div className="team-modal-overlay" onClick={onClose}>
                <div className="team-modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Моя команда</h2>
                    <div className="team-actions-container">
                        <button
                            className="btn-create-team"
                            onClick={handleOpenCreate} // <-- Открываем окно создания
                        >
                            <span className="btn-text">Создать команду</span>
                            <img
                                src="https://img.icons8.com/?size=100&id=qIZSSUb_zxBM&format=png"
                                alt="Plus"
                                className="btn-icon"
                            />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Окно создания команды */}
            <CreateTeamModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleSaveTeam}
            />
        </>
    );
}