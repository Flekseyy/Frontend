// src/components/SettingsModal.jsx
import React, { useState } from 'react';
import '../styles/Windows/StyleSettingsWindow.css';
import '../styles/CommonUI.css';

function SettingsModal({ isOpen, onClose }) {
    // Загружаем сохраненные настройки при открытии
    const loadSettings = () => {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        // Значения по умолчанию
        return {
            darkTheme: true,
            notifications: true,
            soundEffects: false,
            animations: true,
            language: 'ru'
        };
    };

    const [settings, setSettings] = useState(loadSettings);

    // Применяем настройки глобально
    const applySettings = (newSettings) => {
    // Смена темы
    document.documentElement.setAttribute('data-theme', newSettings.darkTheme ? 'dark' : 'light');
    document.body.setAttribute('data-theme', newSettings.darkTheme ? 'dark' : 'light');
        
        // Смена языка
        document.documentElement.lang = newSettings.language;

        // Анимации
        if (!newSettings.animations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }

        // Сохраняем в localStorage
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
    };

    // Применяем настройки при первом рендере
    React.useEffect(() => {
        applySettings(settings);
    }, []);

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = () => {
        applySettings(settings);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel settings-modal" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <h2>Настройки</h2>
                    <button className="common-close-btn" onClick={onClose}>
                        <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close"/>
                    </button>
                </div>

                <div className="settings-container">
                    
                    {/* Секция Внешний вид */}
                    <div className="settings-section">
                        <h3 className="section-title">Внешний вид</h3>
                        
                        <div className="setting-item">
                            <div className="setting-info">
                                <p className="setting-label">Тёмная тема</p>
                                <p className="setting-desc">Использовать тёмную цветовую схему интерфейса</p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.darkTheme} 
                                    onChange={() => handleToggle('darkTheme')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <p className="setting-label">Анимации интерфейса</p>
                                <p className="setting-desc">Плавные переходы и визуальные эффекты</p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.animations} 
                                    onChange={() => handleToggle('animations')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Секция Уведомления */}
                    <div className="settings-section">
                        <h3 className="section-title">Уведомления</h3>
                        
                        <div className="setting-item">
                            <div className="setting-info">
                                <p className="setting-label">Включить уведомления</p>
                                <p className="setting-desc">Получать напоминания о задачах</p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.notifications} 
                                    onChange={() => handleToggle('notifications')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <p className="setting-label">Звуковые эффекты</p>
                                <p className="setting-desc">Проигрывать звуки при действиях</p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.soundEffects} 
                                    onChange={() => handleToggle('soundEffects')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Секция Общие */}
                    <div className="settings-section">
                        <h3 className="section-title">Общие</h3>

                        <div className="setting-item">
                            <div className="setting-info">
                                <p className="setting-label">Язык интерфейса</p>
                                <p className="setting-desc">Choose your preferred language</p>
                            </div>
                            <select 
                                className="settings-select" 
                                value={settings.language} 
                                onChange={(e) => {
                                    setSettings(prev => ({
                                        ...prev,
                                        language: e.target.value
                                    }));
                                }}
                            >
                                <option value="ru">🇷🇺 Русский</option>
                                <option value="en">🇬🇧 English</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="modal-buttons settings-buttons">
                    <button className="btn-cancel" onClick={onClose}>
                        <span className="btn-text">Отмена</span>
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <span className="btn-text">Сохранить настройки</span>
                        <img src="https://img.icons8.com/?size=100&id=1501&format=png" alt="Check" className="btn-icon"/>
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SettingsModal;