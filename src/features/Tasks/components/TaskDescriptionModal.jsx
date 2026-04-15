import React from 'react'
import '../styles.css'
import '../../../styles/common-ui.css'

export default function TaskDescriptionModal({ task, isOpen, onClose }) {
    if (!isOpen || !task) return null

    return (
        <div className="desc-modal-overlay" onClick={onClose}>
            <div className="desc-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>

                <button className="common-close-btn" onClick={onClose}>
                    <img src="https://img.icons8.com/?size=96&id=X3PpUHcCmmeD&format=png" alt="Close" />
                </button>

                <h2 className="desc-title">{task.title}</h2>

                <div className="desc-full-text custom-scrollbar">
                    {task.description ? task.description : <em style={{opacity: 0.5}}>Описание отсутствует</em>}
                </div>

                <div className="desc-modal-buttons">
                    <button className="btn-cancel" onClick={onClose}>
                        <span className="btn-text">Закрыть</span>
                        <img src="https://img.icons8.com/?size=96&id=DXECg4JU1n2x&format=png" alt="Check" className="btn-icon" />
                        <div className="btn-bg-slide"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}