import React, { useState } from 'react';
import '../../styles/Windows/CommandWindow/StyleTeamTasksWindow.css';
import '../../styles/CommonUI.css';
import '../../styles/Windows/TaskCard/StyleTaskCard.css';
import '../../styles/CommonUI.css'; // <--- 1. ПОДКЛЮЧАЕМ НОВЫЙ ФАЙЛ СО СКРОЛЛОМ

import AddTaskModal from '../UserTaskListComponents/AddTaskModal';
import EditTaskModal from '../UserTaskListComponents/EditTaskModal';
import DeleteTaskModal from '../UserTaskListComponents/DeleteTaskModal';
import TaskCard from '../UserTaskListComponents/TaskCard';
import ConfirmMoveModal from './ConfirmMoveModal';
import WarningModal from './WarningModal';

export default function TeamTasksWindow({ teamData, onClose }) {

    const [tasks, setTasks] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [pendingMove, setPendingMove] = useState(null);

    if (!teamData) return null;

    const handleAddTask = (newTask) => {
        const taskWithId = { ...newTask, id: Date.now(), status: 'todo', createdAt: new Date().toLocaleString() };
        setTasks([...tasks, taskWithId]);
        setIsAddOpen(false);
    };

    const openEditModal = (task) => { setCurrentTask(task); setIsEditOpen(true); };
    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setIsEditOpen(false); setCurrentTask(null);
    };
    const openDeleteModal = (task) => { setCurrentTask(task); setIsDeleteOpen(true); };
    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setIsDeleteOpen(false); setCurrentTask(null);
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('taskId'));
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const currentStatus = task.status;
        let message = '';
        let type = '';

        if (currentStatus === newStatus) return;

        if (currentStatus === 'done' && newStatus === 'in-progress') {
            message = 'Невозможно перенести задачу в эту колонку.';
            type = 'warning';
        } else if (currentStatus === 'done' && newStatus === 'todo') {
            message = 'Вы точно хотите переоткрыть задачу?';
            type = 'confirm';
        } else if (currentStatus === 'in-progress' && newStatus === 'todo') {
            message = 'Вы точно хотите перенести задачу в эту колонку?';
            type = 'confirm';
        } else if (currentStatus === 'todo' && newStatus === 'done') {
            message = 'Вы уверены , что задачу можно решить именно таким способом?';
            type = 'confirm';
        } else if (currentStatus === 'todo' && newStatus === 'in-progress') {
            message = 'Вы хотите взять задачу?';
            type = 'confirm';
        } else if (currentStatus === 'in-progress' && newStatus === 'done') {
            message = 'Вы готовы завершить задачу?';
            type = 'confirm';
        } else {
            executeMove(taskId, newStatus);
            return;
        }

        if (type) {
            setPendingMove({ taskId, newStatus, message, type });
            if (type === 'warning') {
                setIsWarningOpen(true);
            } else {
                setIsConfirmOpen(true);
            }
        }
    };

    const executeMove = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const confirmAction = () => {
        if (pendingMove) {
            executeMove(pendingMove.taskId, pendingMove.newStatus);
            setPendingMove(null);
            setIsConfirmOpen(false);
        }
    };

    const cancelAction = () => {
        setPendingMove(null);
        setIsConfirmOpen(false);
    };

    const closeWarning = () => {
        setPendingMove(null);
        setIsWarningOpen(false);
    };

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="team-tasks-overlay">
            <div className="team-tasks-content glass-panel" onClick={(e) => e.stopPropagation()}>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <div className="tasks-header">
                    <h2>Задачи команды</h2>
                    <span className="team-name-subtitle">{teamData.name}</span>
                </div>

                <div className="kanban-board">

                    {/* Колонка 1: К выполнению */}
                    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'todo')}>
                        <div className="column-header todo-header">К выполнению ({todoTasks.length})</div>
                        {/* 2. ДОБАВЛЯЕМ КЛАСС custom-scrollbar */}
                        <div className="column-tasks custom-scrollbar">
                            {todoTasks.map(task => (
                                <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                    <TaskCard task={task} onEdit={openEditModal} onDelete={openDeleteModal} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Колонка 2: В процессе */}
                    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'in-progress')}>
                        <div className="column-header progress-header">В процессе ({inProgressTasks.length})</div>
                        {/* 2. ДОБАВЛЯЕМ КЛАСС custom-scrollbar */}
                        <div className="column-tasks custom-scrollbar">
                            {inProgressTasks.map(task => (
                                <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                    <TaskCard task={task} onEdit={openEditModal} onDelete={openDeleteModal} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Колонка 3: Готово */}
                    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'done')}>
                        <div className="column-header done-header">Готово ({doneTasks.length})</div>
                        {/* 2. ДОБАВЛЯЕМ КЛАСС custom-scrollbar */}
                        <div className="column-tasks custom-scrollbar">
                            {doneTasks.map(task => (
                                <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                    <TaskCard task={task} onEdit={openEditModal} onDelete={openDeleteModal} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="tasks-actions-container">
                    <button className="btn-add-task-icon-only" onClick={() => setIsAddOpen(true)}>
                        <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt="Add Task" className="task-icon-img" />
                    </button>
                </div>
            </div>

            <AddTaskModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleAddTask} />

            {isEditOpen && currentTask && (
                <EditTaskModal task={currentTask} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleUpdateTask} />
            )}

            {isDeleteOpen && currentTask && (
                <DeleteTaskModal task={currentTask} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={() => handleDeleteTask(currentTask.id)} />
            )}

            <ConfirmMoveModal
                isOpen={isConfirmOpen}
                message={pendingMove?.message || ''}
                onConfirm={confirmAction}
                onCancel={cancelAction}
            />

            <WarningModal
                isOpen={isWarningOpen}
                message={pendingMove?.message || ''}
                onClose={closeWarning}
            />
        </div>
    );
}