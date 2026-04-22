import React, { useRef, useState } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'
import { createTeam } from '../../../services/api'

export default function CreateTeamWindow({ isOpen, onClose, onSave, token }) {
    const fileInputRef = useRef(null)
    const [teamName, setTeamName] = useState('')
    const [logoFile, setLogoFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')

    if (!isOpen) return null

    const handleAvatarClick = () => {
        if (!isUploading && !isSubmitting) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите изображение')
                return
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер изображения не должен превышать 5МБ')
                return
            }

            setIsUploading(true)
            setLogoFile(file)

            const reader = new FileReader()
            reader.onload = (event) => {
                setPreviewUrl(event.target.result)
                setIsUploading(false)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerError('')

        if (!teamName.trim()) {
            setServerError('Введите название команды')
            return
        }

        setIsSubmitting(true)

        try {
            const newTeam = await createTeam({
                name: teamName,
                logo: previewUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5irPY5zzxpbRCQhMvD6dI3gv8iSDO2WDxA&s'
            }, token)

            onSave(newTeam)
            setTeamName('')
            setLogoFile(null)
            setPreviewUrl(null)
            onClose()
        } catch (err) {
            console.error(err)
            const errorMessage = err.response?.data?.message || 'Не удалось создать команду. Попробуйте позже.'
            setServerError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="create-team-modal-overlay" onClick={onClose}>
            <div className="create-team-modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="common-close-btn" onClick={onClose} disabled={isSubmitting}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <h2>Создание команды</h2>

                {serverError && (
                    <div style={{ color: '#ff5252', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="team-avatar-section">
                        <div className="team-avatar-circle" onClick={handleAvatarClick}>
                            {isUploading && (
                                <div className="avatar-loading">
                                    <span className="loading-text">Загрузка...</span>
                                </div>
                            )}
                            
                            {previewUrl && !isUploading && (
                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            )}
                            
                            {!previewUrl && !isUploading && (
                                <img 
                                    src="https://img.icons8.com/?size=96&id=TGKHLKPBB4J8&format=png" 
                                    alt="Upload" 
                                    className="avatar-upload-icon"
                                    style={{ width: '32px', height: '32px', filter: 'brightness(0) invert(1)', opacity: '0.7' }}
                                />
                            )}
                            
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                disabled={isUploading || isSubmitting}
                            />
                        </div>
                        <p className="avatar-hint">Нажмите, чтобы добавить логотип</p>
                    </div>

                    <input
                        type="text"
                        className="create-team-input"
                        placeholder="Введите название команды"
                        value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value)
                            if (serverError) setServerError('')
                        }}
                        required
                        autoFocus
                        disabled={isSubmitting}
                    />

                    <div className="modal-buttons">
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            <span className="btn-text">Отмена</span>
                            <img src="https://img.icons8.com/?size=96&id=DXECg4JU1n2x&format=png" alt="Cancel" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>

                        <button 
                            type="submit" 
                            className="btn-save"
                            style={{ borderColor: '#098765' }}
                            disabled={isSubmitting}
                        >
                            <span className="btn-text">{isSubmitting ? 'Создание...' : 'Создать'}</span>
                            <img src="https://img.icons8.com/?size=96&id=GqJpEbXPcmLg&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}