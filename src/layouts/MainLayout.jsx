import React, { useEffect, useState } from 'react'
import './MainLayout.css'
import { useTranslation } from '../i18n/LanguageContext'
import { getAssignments, getCurrentUser, createTask } from '../services/api'

import AddTaskModal from '../features/Tasks/components/AddTaskModal'
import DeleteTaskModal from '../features/Tasks/components/DeleteTaskModal'
import EditTaskModal from '../features/Tasks/components/EditTaskModal'
import TaskCard from '../features/Tasks/components/TaskCard'
import TeamStartWindow from '../features/Teams/components/TeamStartWindow'
import TaskDescriptionModal from '../features/Tasks/components/TaskDescriptionModal'
import ProfileModal from '../features/Profile/components/ProfileModal'
import SettingsModal from '../features/Settings/components/SettingsModal';

function MainLayout({ onLogout }) {
    const { t } = useTranslation();
    const [tasks, setTasks] = useState([])
    const [tasksError, setTasksError] = useState('')
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedTaskForDesc, setSelectedTaskForDesc] = useState(null)
    const [isTeamOpen, setIsTeamOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [isDarkMode, setIsDarkMode] = useState(true)

    const normalizeTask = (raw) => {
        if (!raw || typeof raw !== 'object') return raw
        return {
            ...raw,
            id: raw.id ?? raw.Id ?? raw.assignmentId ?? raw.AssignmentId,
            title: raw.title ?? raw.Title ?? '',
            description: raw.description ?? raw.Description ?? '',
            priority: raw.priority ?? raw.Priority ?? null,
            deadline: raw.deadline ?? raw.Deadline ?? null,
            createdAt: raw.createdAt ?? raw.CreatedAt ?? raw.created ?? raw.Created ?? null,
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const isDark = savedTheme ? savedTheme === 'dark' : true
        setIsDarkMode(isDark)
        if (isDark) {
            document.body.classList.add('dark-theme')
            document.body.classList.remove('light-theme')
        } else {
            document.body.classList.add('light-theme')
            document.body.classList.remove('dark-theme')
        }
    }, [])

    useEffect(() => {
        const user = getCurrentUser()
        setCurrentUser(user?.id)
    }, [])

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            if (!currentUser) return
            
            try {
                setTasksError('')
                const data = await getAssignments()
                if (cancelled) return
                
                if (Array.isArray(data)) {
                    const normalized = data.map(normalizeTask)
                    const userTasks = normalized.filter(task => 
                        task.assigneeId === currentUser || 
                        task.userId === currentUser ||
                        (task.authorId && task.authorId === currentUser)
                    )
                    setTasks(userTasks)
                } else {
                    setTasks([])
                }
            } catch (e) {
                if (cancelled) return
                console.error("Error loading tasks:", e)
                setTasksError(t('tasksLoadError') || 'Не удалось загрузить задачи.')
                setTasks([])
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [currentUser, t])

    const handleSaveTask = async (newTask) => {
        try {
            const payload = {
                ...newTask,
                userId: currentUser,
                authorId: currentUser
            }
            
            await createTask(payload)
            
            const data = await getAssignments()
            if (Array.isArray(data)) {
                const normalized = data.map(normalizeTask)
                const userTasks = normalized.filter(task => 
                    task.assigneeId === currentUser || 
                    task.userId === currentUser ||
                    (task.authorId && task.authorId === currentUser)
                )
                setTasks(userTasks)
            }
            setIsAddOpen(false)
        } catch (error) {
            setTimeout(() => {
                const reload = async () => {
                    try {
                        const data = await getAssignments()
                        if (Array.isArray(data)) {
                            const normalized = data.map(normalizeTask)
                            const userTasks = normalized.filter(task => 
                                task.assigneeId === currentUser || 
                                task.userId === currentUser ||
                                (task.authorId && task.authorId === currentUser)
                            )
                            setTasks(userTasks)
                        }
                        setTasksError('')
                    } catch (e) {
                        console.error("Reload error:", e)
                    }
                }
                reload()
            })
        }
    }

    const openEditModal = (task) => {
        setCurrentTask(task)
        setIsEditOpen(true)
    }

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
        setIsEditOpen(false)
        setCurrentTask(null)
    }

    const openDeleteModal = (task) => {
        setCurrentTask(task)
        setIsDeleteOpen(true)
    }

    const handleDeleteTask = async (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        setIsDeleteOpen(false)
        setCurrentTask(null)
    }

    const openDescModal = (task) => {
        setSelectedTaskForDesc(task)
    }

    const toggleTheme = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)
        localStorage.setItem('theme', newMode ? 'dark' : 'light')
        
        if (newMode) {
            document.body.classList.add('dark-theme')
            document.body.classList.remove('light-theme')
        } else {
            document.body.classList.add('light-theme')
            document.body.classList.remove('dark-theme')
        }
    }

    return (
        <>
            <div className="animated-bg-waves">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            <section className="leftPanel">
                <div id="rectangle-left-panel" className="glass-panel">
                    
                    <div className="panel-top-group">
                        <button
                            id="profile-icon"
                            className="icon"
                            onClick={() => setIsProfileOpen(true)}
                            title={t('navProfile')}
                            aria-label={t('navProfile')}
                        >
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=p8UFrp2VUgHR&format=png" alt={t('navProfile')} className="img-default"/>
                            <span className="icon-text">{t('navProfile')}</span>
                        </button>

                        <button
                            id="team-icon"
                            className="icon"
                            onClick={() => setIsTeamOpen(true)}
                            title={t('navTeams')}
                            aria-label={t('navTeams')}
                        >
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=aSlhg0UOn67Q&format=png" alt={t('navTeams')} className="img-default"/>
                            <span className="icon-text">{t('navTeams')}</span>
                        </button>

                        <button
                            id="quests-icon"
                            className="icon"
                            title={t('navTasks')}
                            aria-label={t('navTasks')}
                        >
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=ljwCE5MTJHVo&format=png" alt={t('navTasks')} className="img-default"/>
                            <span className="icon-text">{t('navTasks')}</span>
                        </button>
                    </div>

                    <button
                        id="settings-icon"
                        className="icon"
                        onClick={() => setIsSettingsOpen(true)}
                        title={t('navSettings')}
                        aria-label={t('navSettings')}
                    >
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=xyFoc6U1Hu3c&format=png" alt={t('navSettings')} className="img-default"/>
                            <span className="icon-text">{t('navSettings')}</span>
                    </button>
                </div>
            </section>

            <section className="top-panel">
                <div id="rectangle-top-panel" className="glass-panel">
                    <h1>SaveYourTime</h1>
                    <button
                        id="add-task-icon"
                        className="icon"
                        onClick={() => setIsAddOpen(true)}
                        title={t('addTask')}
                        aria-label={t('addTask')}
                    >
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt={t('addTask')} className="img-default"/>
                            <span className="icon-text">{t('addTask')}</span>
                    </button>
                </div>
            </section>

            <div className="tasks-panel-container">
                <div className="tasks-scroll-wrapper custom-scrollbar">
                    <div className="tasks-grid">
                        {tasksError && (
                            <div style={{ color: '#ff5252', textAlign: 'center', marginBottom: '10px', fontSize: '14px', gridColumn: '1/-1' }}>
                                {tasksError}
                            </div>
                        )}
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                                onViewDetails={() => openDescModal(task)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AddTaskModal 
                isOpen={isAddOpen} 
                onClose={() => setIsAddOpen(false)} 
                onSave={handleSaveTask} 
                token={localStorage.getItem('token')} 
            />

            {isEditOpen && currentTask && (
                <EditTaskModal task={currentTask} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleUpdateTask} />
            )}

            {isDeleteOpen && currentTask && (
                <DeleteTaskModal task={currentTask} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={() => handleDeleteTask(currentTask.id)} />
            )}

            {selectedTaskForDesc && (
                <TaskDescriptionModal
                    task={selectedTaskForDesc}
                    isOpen={!!selectedTaskForDesc}
                    onClose={() => setSelectedTaskForDesc(null)}
                />
            )}

            <TeamStartWindow isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />
            
            <ProfileModal 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
                onLogout={onLogout} 
            />
            
            <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                isDarkMode={isDarkMode}
                onToggleTheme={toggleTheme}
            />
        </>
    )
}

export default MainLayout