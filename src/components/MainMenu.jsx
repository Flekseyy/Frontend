// src/App/MainMenu.jsx
import React, { useState } from 'react';
import '../styles/Windows/StyleMainWindow.css';
import '../styles/Animation/AnimatedBackground.css';
import '../styles/Animation/TransitionAnimation.css';

import AddTaskModal from './UserTaskListComponents/AddTaskModal';
import DeleteTaskModal from './UserTaskListComponents/DeleteTaskModal';
import EditTaskModal from './UserTaskListComponents/EditTaskModal';
import TaskCard from './UserTaskListComponents/TaskCard';
import TeamStartWindow from './TeamComponents/TeamStartWindow';
import TaskDescriptionModal from './UserTaskListComponents/TaskDescriptionModal';
import ProfileModal from '../components/ProfileComponents/ProfileModal';

function MainMenu() {
    const [tasks, setTasks] = useState([]);

    // Состояния для модальных окон задач
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // <--- НОВОЕ СОСТОЯНИЕ ДЛЯ ОКНА ОПИСАНИЯ
    const [selectedTaskForDesc, setSelectedTaskForDesc] = useState(null);

    const [isTeamOpen, setIsTeamOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleSaveTask = (newTask) => {
        const taskWithId = {
            ...newTask,
            id: Date.now(),
            createdAt: new Date().toISOString(), // <--- ТОЧНО ISO
        };
        setTasks([...tasks, taskWithId]);
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setIsEditOpen(true);
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setIsEditOpen(false);
        setCurrentTask(null);
    };

    const openDeleteModal = (task) => {
        setCurrentTask(task);
        setIsDeleteOpen(true);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setIsDeleteOpen(false);
        setCurrentTask(null);
    };

    // Функция для открытия окна описания
    const openDescModal = (task) => {
        setSelectedTaskForDesc(task);
    };

    return (
        <>
            <div className="animated-bg-waves">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            <section className="leftPanel">
                <div id="rectangle-left-panel" className="glass-panel">
                    <button id="profile-icon" className="icon" onClick={() => setIsProfileOpen(true)}>
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=p8UFrp2VUgHR&format=png" alt="Профиль" className="img-default"/>
                        <span className="icon-text">Профиль</span>
                    </button>
                    <button id="team-icon" className="icon" onClick={() => setIsTeamOpen(true)}>
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=aSlhg0UOn67Q&format=png" alt="Команда" className="img-default"/>
                        <span className="icon-text">Команда</span>
                    </button>
                    <button id="quests-icon" className="icon">
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=ljwCE5MTJHVo&format=png" alt="Задания" className="img-default"/>
                        <span className="icon-text">Задания</span>
                    </button>
                    <button id="settings-icon" className="icon">
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=xyFoc6U1Hu3c&format=png" alt="Настройки" className="img-default"/>
                        <span className="icon-text">Настройки</span>
                    </button>
                </div>
            </section>

            <section className="top-panel">
                <div id="rectangle-top-panel" className="glass-panel">
                    <h1>SaveYourTime</h1>
                    <button id="add-task-icon" className="icon" onClick={() => setIsAddOpen(true)}>
                        <svg className="icon-svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="120 400" strokeDashoffset="120"/></svg>
                        <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt="Добавить" className="img-default"/>
                        <span className="icon-text">Добавить задачу</span>
                    </button>
                </div>
            </section>

            <section className="tasks-container">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                        onViewDetails={openDescModal} // <--- ПЕРЕДАЕМ ФУНКЦИЮ ОТКРЫТИЯ
                    />
                ))}
            </section>

            {/* Модалки задач */}
            <AddTaskModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleSaveTask} />

            {isEditOpen && currentTask && (
                <EditTaskModal task={currentTask} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleUpdateTask} />
            )}

            {isDeleteOpen && currentTask && (
                <DeleteTaskModal task={currentTask} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={() => handleDeleteTask(currentTask.id)} />
            )}

            {/* <--- МОДАЛКА ОПИСАНИЯ РЕНДЕРИТСЯ ЗДЕСЬ, НА УРОВНЕ ГЛАВНОГО МЕНЮ */}
            {selectedTaskForDesc && (
                <TaskDescriptionModal
                    task={selectedTaskForDesc}
                    isOpen={!!selectedTaskForDesc}
                    onClose={() => setSelectedTaskForDesc(null)}
                />
            )}

            <TeamStartWindow isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </>
    );
}

export default MainMenu;