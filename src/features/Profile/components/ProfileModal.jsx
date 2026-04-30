import React, { useRef, useState } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'
import ChangePasswordModal from './ChangePasswordModal'
import LogoutConfirmModal from './LogoutConfirmModal'
import { useTranslation } from '../../../i18n/LanguageContext'

function ProfileModal({ isOpen, onClose, onLogout }) {
    const { t } = useTranslation();
    const fileInputRef = useRef(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    
    const [isChangePassOpen, setIsChangePassOpen] = useState(false)
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

    const handleAvatarClick = () => {
        if (!isUploading) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста выберите изображение')
                return
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер изображения не должен превышать 5МБ')
                return
            }

            setIsUploading(true)
            setUploadProgress(0)

            const reader = new FileReader()
            
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100)
                    setUploadProgress(progress)
                }
            }

            reader.onload = (event) => {
                setAvatarUrl(event.target.result)
                
                setTimeout(() => {
                    setIsUploading(false)
                    setUploadProgress(100)
                    console.log('Аватар успешно загружен:', file.name)
                }, 800)
            }
            
            reader.readAsDataURL(file)
        }
    }

    const handleLogoutClick = () => {
        setIsLogoutConfirmOpen(true)
    }

    const confirmLogout = () => {
        setIsLogoutConfirmOpen(false)
        onClose() 
        onLogout() 
    }

    if (!isOpen) return null

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>

                    <div className="modal-header">
                        <h2>{t('profileTitle')}</h2>
                        <button className="common-close-btn" onClick={onClose}>
                            <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt=" Close"/>
                        </button>
                    </div>

                    <div className="profile-header">
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
                            <div className="info-content"><p className="info-label">{t('registrationDate')}</p><p
                                className="info-value">01.01.1980</p></div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon"><img
                                src="https://img.icons8.com/?size=48&id=jTBefpe7oeWd&format=png"/></div>
                            <div className="info-content"><p className="info-label">{t('completedTasks')}</p><p
                                className="info-value">NaN</p></div>
                        </div>
                        <div className="info-card full-width">
                            <div className="info-icon"><img
                                src="https://img.icons8.com/?size=48&id=w5QHcTVpp1In&format=png"/></div>
                            <div className="info-content"><p className="info-label">{t('email')}</p><p
                                className="info-value">te***@gmail.com</p></div>
                        </div>
                    </div>

                    <div className="profile-actions" style={{ display: 'flex', gap: '10px', marginTop: '40px', justifyContent: 'center', width: '100%'}}>
                        <button 
                            className="btn-save" 
                            onClick={() => setIsChangePassOpen(true)}
                        >
                            <span className="btn-text">{t('changePassword')}</span>
                            <img src="https://img.icons8.com/?size=96&id=UZxwz5MMFO8j&format=png" alt="Key" className="btn-icon"/>
                            <div className="btn-bg-slide"></div>
                        </button>

                        <button 
                            className="btn-cancel" 
                            onClick={handleLogoutClick}>
                            <span className="btn-text">{t('logout')}</span>
                            <img src="https://img.icons8.com/?size=96&id=5HW1YsFkzHio&format=png" alt="Logout" className="btn-icon"/>
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </div>
            </div>

            <ChangePasswordModal 
                isOpen={isChangePassOpen} 
                onClose={() => setIsChangePassOpen(false)} 
            />

            <LogoutConfirmModal 
                isOpen={isLogoutConfirmOpen}
                onConfirm={confirmLogout}
                onCancel={() => setIsLogoutConfirmOpen(false)}
            />
        </>
    )
}

export default ProfileModal