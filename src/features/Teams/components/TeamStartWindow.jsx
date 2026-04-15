import React, { useState } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'

import CreateTeamWindow from './CreateTeamWindow'
import TeamProfile from './TeamProfile'

export default function TeamStartWindow({ isOpen, onClose }) {
    const [teams, setTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    if (!isOpen) return null

    const handleSaveTeam = (newTeam) => {
        setTeams([...teams, newTeam])
        setCurrentTeam(newTeam)
        setIsCreateOpen(false)
    }

    const handleSelectTeam = (team) => {
        setCurrentTeam(team)
    }

    const handleBackToList = () => {
        setCurrentTeam(null)
    }

    if (isCreateOpen) {
        return (
            <CreateTeamWindow
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleSaveTeam}
            />
        )
    }

    if (currentTeam) {
        return (
            <TeamProfile
                teamData={currentTeam}
                onClose={handleBackToList}
            />
        )
    }

    return (
        <div className="team-list-overlay" onClick={onClose}>
            <div className="team-list-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Мои команды</h2>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

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

                <div className="list-actions-container">
                    <button className="btn-create-team-small" onClick={() => setIsCreateOpen(true)}>
                        <span className="btn-text">Создать команду</span>
                        <img src="https://img.icons8.com/?size=96&id=Y0LmisQTNVSH&format=png" alt="Plus" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}