import { useEffect, useRef } from 'preact/hooks';

const ErrorModal = ({ errors, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="error-modal">
            <div className="modal-content" ref={modalRef}>
                <h2>Por favor valida los siguientes campos:</h2>
                <ul>
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ErrorModal;
