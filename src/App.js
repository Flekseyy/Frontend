import React, {useState} from 'react';
import './styles/App.css';
import AddTaskModal from "./components/AddTask/AddTask";

function App() {

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        alert('Задача добавлена!');
        setIsAddTaskOpen(false);
    };

  return (
      <body>
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
              <button id="add-task-icon" className="icon" onClick={() => setIsAddTaskOpen(true)} >
                  <img src="https://img.icons8.com/?size=96&id=1OvPrBUWbMke&format=png" alt="Команда"
                       className="img-default"/>


                  <AddTaskModal
                      isOpen={isAddTaskOpen}
                      onClose={() => setIsAddTaskOpen(false)}
                  >
                      <div style={{ padding: '10px' }}>
                          <h2 style={{ marginTop: 0 }}>Новая задача</h2>

                          <form onSubmit={handleAddTask}>
                              <input
                                  type="text"
                                  placeholder="Название задачи"
                                  className="modal-input"
                                  required
                              />
                              <textarea
                                  placeholder="Описание"
                                  className="modal-input"
                                  rows="3"
                              ></textarea>
                              <input
                                  type="date"
                                  className="modal-input"
                              />

                              <button type="submit" className="add-task-btn">
                                  Создать задачу
                              </button>
                          </form>
                      </div>
                  </AddTaskModal>
                  <span className="icon-text">Добавить задачу</span>
              </button>
          </div>
      </section>
      </body>
  );
}

export default App;
