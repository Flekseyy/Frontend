import React, { useState, useEffect } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'
import { useTranslation } from '../../../i18n/LanguageContext'
import { getTeams, getCurrentUser } from '../../../services/api'

import CreateTeamWindow from './CreateTeamWindow'
import TeamProfile from './TeamProfile'

export default function TeamStartWindow({ isOpen, onClose }) {
    const { t } = useTranslation();
    const [teams, setTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isOpen) {
            loadTeams()
        }
    }, [isOpen])

    const loadTeams = async () => {
        try {
            setIsLoading(true)
            const currentUser = getCurrentUser()
            const allTeams = await getTeams()

            // Фильтруем команды: показываем только те, где пользователь является лидером или участником
            const userTeams = allTeams.filter(team =>
                team.leaderId === currentUser?.id ||
                team.members?.some(member => member.userId === currentUser?.id)
            )

            setTeams(userTeams)
        } catch (error) {
            console.error('Ошибка при загрузке команд:', error)
            setTeams([])
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    const handleSaveTeam = () => {
        loadTeams()
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
                token={localStorage.getItem('token')}
            />
        )
    }

    if (currentTeam) {
        return (
            <TeamProfile
                teamData={currentTeam}
                onClose={handleBackToList}
                onRefresh={loadTeams}
            />
        )
    }

    return (
        <div className="team-list-overlay" onClick={onClose}>
            <div className="team-list-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <header>{t('myTeams')}</header>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <div className="teams-scroll-container custom-scrollbar">
                    {isLoading ? (
                        <p className="empty-message">{t('loading')}</p>
                    ) : teams.length === 0 ? (
                        <p className="empty-message">{t('noTeams')}</p>
                    ) : (
                        teams.map((team) => (
                            <div
                                key={team.id}
                                className="team-item"
                                onClick={() => handleSelectTeam(team)}
                            >
                                <div className="team-item-logo">
                                    <img src={'https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png'} alt={team.name} />
                                </div>
                                <span className="team-item-name">{team.name}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="list-actions-container">
                    <button className="btn-add-member" onClick={() => setIsCreateOpen(true)} style={{ width: '50%' }}>
                        <span className="btn-text">{t('createTeam')}</span>
                        <img src="https://img.icons8.com/?size=96&id=Y0LmisQTNVSH&format=png" alt="Plus" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}