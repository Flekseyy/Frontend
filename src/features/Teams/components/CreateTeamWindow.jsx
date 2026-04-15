import React, { useState } from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'

export default function CreateTeamWindow({ isOpen, onClose, onSave}) {
    const [teamName, setTeamName] = useState('')
    const [logoFile, setLogoFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    if (!isOpen) return null

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (teamName.trim()) {
            onSave({
                name: teamName,
                logo: previewUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5irPY5zzxpbRCQhMvD6dI3gv8iSDO2WDxA&s'
            })
        }
    }

    return (
        <div className="create-team-modal-overlay" onClick={onClose}>
            <div className="create-team-modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <h2>Создание команды</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название команды"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        autoFocus
                    />

                    <div className="logo-upload-section">
                        <label className="field-label">Логотип:</label>

                        {previewUrl && (
                            <div className="logo-preview-box">
                                <img src={previewUrl} alt="Preview" />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="logo-input"
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="btn-save">
                            <span className="btn-text">Сохранить</span>
                            <img src="https://img.icons8.com/?size=96&id=GqJpEbXPcmLg&format=png" alt="Check" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>

                        <button type="button" className="btn-cancel" onClick={onClose}>
                            <span className="btn-text">Отмена</span>
                            <img src="https://img.icons8.com/?size=96&id=DXECg4JU1n2x&format=png" alt="Cancel" className="btn-icon" />
                            <div className="btn-bg-slide"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}