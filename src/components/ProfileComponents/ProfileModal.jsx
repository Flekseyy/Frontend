// src/components/ProfileComponents/ProfileModal.jsx
import React, { useRef, useState } from 'react';
import '../../styles/Windows/StyleProfileWindow.css';
import '../../styles/CommonUI.css';

function ProfileModal({ isOpen, onClose }) {
    const fileInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleAvatarClick = () => {
        if (!isUploading) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Валидация файла
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста выберите изображение');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер изображения не должен превышать 5МБ');
                return;
            }

            setIsUploading(true);
            setUploadProgress(0);

            const reader = new FileReader();
            
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress);
                }
            };

            reader.onload = (event) => {
                setAvatarUrl(event.target.result);
                
                // Имитация загрузки на сервер
                setTimeout(() => {
                    setIsUploading(false);
                    setUploadProgress(100);
                    console.log('Аватар успешно загружен:', file.name);
                }, 800);
            };
            
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (


        <div className=" modal-overlay" onClick={onClose}>
            <div className=" modal-content glass-panel" onClick={(e) => e.stopPropagation()}>


                <div className=" modal-header">
                    <h2>Профиль</h2>
                    <button className="common-close-btn" onClick={onClose}>
                        <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt=" Close"/>
                    </button>
                </div>

                <div className=" profile-header">
                    <div className="avatar" onClick={handleAvatarClick}>
                        {avatarUrl && <img src={avatarUrl} alt="Аватар"/>}
                        
                        {isUploading && (
                            <div className="avatar-loading">
                                <div className="upload-progress" style={{width: `${uploadProgress}%`}}></div>
                                <span className="progress-text">{uploadProgress}%</span>
                            </div>
                        )}
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{display: 'none'}}
                            disabled={isUploading}
                        />
                    </div>
                    <h3>Никнейм</h3>
                    <p className="user-id">id: 2317891</p>
                </div>

                <div className="profile-info">
                    <div className="info-card">
                        <div className="info-icon"><img
                            src="https://img.icons8.com/?size=48&id=ZH1JWehKJFAC&format=png"/></div>
                        <div className="info-content"><p className="info-label">Дата регистрации:</p><p
                            className="info-value">01.01.1980</p></div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon"><img
                            src="https://img.icons8.com/?size=48&id=jTBefpe7oeWd&format=png"/></div>
                        <div className="info-content"><p className="info-label">Закрыто задач:</p><p
                            className="info-value">NaN</p></div>
                    </div>
                    <div className="info-card full-width">
                        <div className="info-icon"><img
                            src="https://img.icons8.com/?size=48&id=w5QHcTVpp1In&format=png"/></div>
                        <div className="info-content"><p className="info-label">Электронная почта:</p><p
                            className="info-value">te***@gmail.com</p></div>
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
                            <img src="https://img.icons8.com/?size=100&id=1501&format=png" alt="Check"
                                 className="btn-icon"/>
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;