import React, { useState } from 'react';
import '../styles/StyleMainWindow.css';
import '../styles/Animations.css';
import AddTaskModal from '../components/AddTaskModal';
import TaskCard from '../components/TaskCard';


function MainMenu() {


    // 3. Состояние: открыто ли окно? (по умолчанию false - закрыто)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Состояние для списка задач (пока просто храним в памяти)
    const [tasks, setTasks] = useState([]);

    // Функция, которая срабатывает, когда мы сохраняем задачу в окне
    const handleSaveTask = (newTask) => {
        const taskWithId = {
            ...newTask,
            id: Date.now(), // Уникальный ID
            createdAt: new Date().toLocaleString()
        };
        setTasks([...tasks, taskWithId]); // Добавляем в список
    };



    return (
        <>

            <div className="fade-in-overlay"></div>

            <div className="animated-bg-waves">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            <section className="leftPanel">
                <div id="rectangle-left-panel" className="glass-panel">
                    <button id="profile-icon" className="icon">
                        <img src="https://img.icons8.com/?size=96&id=p8UFrp2VUgHR&format=png" alt="Профиль"
                             className="img-default"/>
                        <span className="icon-text">Профиль</span>
                    </button>
                    <button id="team-icon" className="icon">
                        <img src="https://img.icons8.com/?size=96&id=jT7odbbZbfsK&format=png" alt="Команда"
                             className="img-default"/>
                        <span className="icon-text">Команда</span>
                    </button>
                    <button id="quests-icon" className="icon">
                        <img src="https://img.icons8.com/?size=96&id=Q5L9qorNWZuu&format=png" alt="Задания"
                             className="img-default"/>
                        <span className="icon-text">Задания</span>
                    </button>
                    <button id="settings-icon" className="icon">
                        <img src="https://img.icons8.com/?size=96&id=xyFoc6U1Hu3c&format=png" alt="Настройки"
                             className="img-default"/>
                        <span className="icon-text">Настройки</span>
                    </button>
                </div>
            </section>


            <section className="top-panel">
                <div id="rectangle-top-panel" className="glass-panel">
                    <h1>SaveYourTime</h1>
                    <button id="add-task-icon"
                            className="icon"
                            onClick={() => setIsModalOpen(true)}>
                        <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt="Команда"
                             className="img-default"/>
                        <span className="icon-text">Добавить задачу</span>
                    </button>
                </div>
            </section>


            <section className="tasks-container">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </section>


            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
            />
        </>
    );
}

export default MainMenu;
