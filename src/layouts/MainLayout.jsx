import React, { useState } from 'react'
import './MainLayout.css'
import { useTranslation } from '../i18n/LanguageContext'

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
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedTaskForDesc, setSelectedTaskForDesc] = useState(null)
    const [isTeamOpen, setIsTeamOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSaveTask = (newTask) => {
        const taskWithId = {
            ...newTask,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        }
        setTasks([...tasks, taskWithId])
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

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        setIsDeleteOpen(false)
        setCurrentTask(null)
    }

    const openDescModal = (task) => {
        setSelectedTaskForDesc(task)
    }

    return (
        <>
            <div className="animated-bg-waves">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            {/* === ЛЕВАЯ ПАНЕЛЬ (Узкая и Длинная) === */}
            <section className="leftPanel">
                <div id="rectangle-left-panel" className="glass-panel">
                    
                    {/* Группа верхних иконок */}
                    <div className="panel-top-group">
                        <button id="profile-icon" className="icon" onClick={() => setIsProfileOpen(true)}>
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=p8UFrp2VUgHR&format=png" alt="Профиль" className="img-default"/>
                            <span className="icon-text">{t('profile')}</span>
                        </button>

                        <button id="team-icon" className="icon" onClick={() => setIsTeamOpen(true)}>
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=aSlhg0UOn67Q&format=png" alt="Команда" className="img-default"/>
                            <span className="icon-text">{t('team')}</span>
                        </button>

                        <button id="quests-icon" className="icon">
                            <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                            <img src="https://img.icons8.com/?size=96&id=ljwCE5MTJHVo&format=png" alt="Задания" className="img-default"/>
                            <span className="icon-text">{t('tasks')}</span>
                        </button>
                    </div>

                    {/* Кнопка настроек внизу */}
                    <button id="settings-icon" className="icon" onClick={() => setIsSettingsOpen(true)}>
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=xyFoc6U1Hu3c&format=png" alt="Настройки" className="img-default"/>
                            <span className="icon-text">{t('settings')}</span>
                    </button>
                </div>
            </section>

            {/* === ВЕРХНЯЯ ПАНЕЛЬ === */}
            <section className="top-panel">
                <div id="rectangle-top-panel" className="glass-panel">
                    <h1>SaveYourTime</h1>
                    <button id="add-task-icon" className="icon" onClick={() => setIsAddOpen(true)}>
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt="Добавить" className="img-default"/>
                            <span className="icon-text">{t('addTask')}</span>
                    </button>
                </div>
            </section>

            {/* === КОНТЕЙНЕР ЗАДАЧ === */}
            <section className="tasks-container">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                        onViewDetails={openDescModal}
                    />
                ))}
            </section>

            {/* === МОДАЛКИ === */}
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
            
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    )
}

export default MainLayout