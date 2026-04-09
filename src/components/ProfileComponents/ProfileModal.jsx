// src/components/ProfileComponents/ProfileModal.jsx
import React, { useRef, useState } from 'react';
import '../../styles/Windows/StyleProfileWindow.css';
import '../../styles/CommonUI.css';

function ProfileModal({ isOpen, onClose }) {
    const fileInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarUrl(event.target.result);
            };
            reader.readAsDataURL(file);
            
            // Здесь потом будет логика загрузки на сервер
            console.log('Выбран файл для аватара:', file.name);
        }
    };

    if (!isOpen) return null;

    return (


        <div className=" modal-overlay" onClick={onClose}>
            <div className=" modal-content glass-panel" onClick={(e) => e.stopPropagation()}>



                <div className=" modal-header">
                    <h2>Профиль</h2>
                    <button className="common-close-btn" onClick={onClose}>
                        <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt=" Close" />
                    </button>
                </div>

                <div className=" profile-header">
                    <div className=" avatar" onClick={handleAvatarClick}>
                        {avatarUrl && <img src={avatarUrl} alt=" Аватар" />}
                        <input 
                            type=" file"
                            ref={fileInputRef} 
                            onChange={handleFileChange}
                            accept=" image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <h3>Никнейм</h3>
                    <p className="user-id">id: 2317891</p>
                </div>

                <div className="profile-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <img src="https://img.icons8.com/?size=48&id=ZH1JWehKJFAC&format=png"/>
                        </div>
                        <div className="info-content">
                            <p className="info-label">Дата регистрации:</p>
                            <p className="info-value">09.04.2026</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <img src="https://img.icons8.com/?size=48&id=w5QHcTVpp1In&format=png"/>
                        </div>
                        <div className="info-content">
                            <p className="info-label">Электронная почта:</p>
                            <p className="info-value">is***@gmail.com</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <img src="https://img.icons8.com/?size=48&id=jTBefpe7oeWd&format=png"/>
                        </div>
                        <div className="info-content">
                            <p className="info-label">Закрыто задач:</p>
                            <p className="info-value">102</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <img src="https://img.icons8.com/?size=48&id=aSlhg0UOn67Q&format=png"/>
                        </div>
                        <div className="info-content">
                            <p className="info-label">Команда:</p>
                            <p className="info-value">Победоносцы</p>
                        </div>
                    </div>
                </div>

                <div className="password-change">
                    <h3>Смена пароля</h3>

                    <div className="form-group">
                        <input type="password" placeholder="Введите старый пароль" className="password-input"/>
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Введите новый пароль" className="password-input"/>
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Повторите новый пароль" className="password-input"/>
                    </div>

                    <div className="modal-buttons">
                        <button className="btn-save">
                            <span className="btn-text">Поменять пароль</span>
                            <img src="https://img.icons8.com/?size=100&id=1501&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;