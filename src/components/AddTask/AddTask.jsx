import "./AddTask.css";

function AddTaskModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default AddTaskModal;