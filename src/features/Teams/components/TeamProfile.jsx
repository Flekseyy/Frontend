import React, { useState, useEffect } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'
import { getTeamById } from '../../../services/api'
import TeamTasksWindow from './TeamTasksWindow'
import AddMemberModal from './AddMemberModal'

export default function TeamProfile({ teamData, onClose, onRefresh }) {
    const [isTasksOpen, setIsTasksOpen] = useState(false)
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [currentTeamData, setCurrentTeamData] = useState(teamData)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (teamData && teamData.id) {
            loadTeamDetails()
        } else {
            setCurrentTeamData(teamData)
            setIsLoading(false)
        }
    }, [teamData])

    const loadTeamDetails = async () => {
        try {
            setIsLoading(true)
            const details = await getTeamById(teamData.id)
            setCurrentTeamData(details)
        } catch (error) {
            console.error('Ошибка при загрузке деталей команды:', error)
            setCurrentTeamData(teamData)
        } finally {
            setIsLoading(false)
        }
    }

    if (!currentTeamData || isLoading) return null

    if (isTasksOpen) {
        return (
            <TeamTasksWindow
                teamData={teamData}
                onClose={() => setIsTasksOpen(false)}
            />
        )
    }

    const handleAddMember = () => {
        setIsAddMemberOpen(true)
    }

    const handleMemberAdded = (memberName) => {
        alert(`Участник "${memberName}" добавлен! (заглушка)`)
    }

    return (
        <div className="team-profile-overlay">
            <div className="team-profile-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <div className="team-header-info">
                    <div className="team-logo-container">
                        <img src={'https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png'} alt="Logo" className="team-logo-img" />
                    </div>
                    <header className="team-name-title">{currentTeamData.name}</header>
                </div>

                <div className="team-stats-placeholder">
                    <p>Участников: 1</p>
                    <p>Задач выполнено: 0</p>
                </div>

                <div className="profile-actions-container">
                    <button className="btn-add-member" onClick={handleAddMember}>
                        <span className="btn-text">+ Участник</span>
                        <img src="https://img.icons8.com/?size=96&id=isUGx8n5CHFi&format=png" alt="Add User" className="btn-icon" />
                        <div className="btn-bg-slide secondary-bg"></div>
                    </button>

                    <button className="btn-team-tasks" onClick={() => setIsTasksOpen(true)}>
                        <span className="btn-text">Задачи</span>
                        <img src="https://img.icons8.com/?size=96&id=xJ3hLmeSmDWo&format=png" alt="Tasks" className="btn-icon" />
                        <div className="btn-bg-slide secondary-bg"></div>
                    </button>
                </div>
            </div>

            <AddMemberModal
                isOpen={isAddMemberOpen}
                onClose={() => setIsAddMemberOpen(false)}
                onAdd={handleMemberAdded}
            />
        </div>
    )
}