import { useState, useEffect } from 'preact/hooks';

// Singleton modal controller
export const modalController = {
    _component: null,
    
    register(component) {
        this._component = component;
    },

    show(message = 'Procesando pago...', type = 'loading') {
        if (this._component) {
            this._component.setMessage(message);
            this._component.setType(type);
            this._component.setIsVisible(true);
        } else {
            console.warn('Modal component not registered');
        }
    },

    hide() {
        if (this._component) {
            this._component.setIsVisible(false);
        } else {
            console.warn('Modal component not registered');
        }
    }
};

export function GlobalModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('Procesando pago...');
    const [type, setType] = useState('loading');

    // Register this component with the controller on mount
    useEffect(() => {
        modalController.register({
            setIsVisible,
            setMessage,
            setType
        });
    }, []);

    if (!isVisible) return null;

    // Render different icons based on type
    const renderIcon = () => {
        switch(type) {
            case 'success':
                return (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="green" 
                        strokeWidth="2" 
                        style={{
                            width: '4rem', 
                            height: '4rem', 
                            strokeWidth: 3,
                            stroke: '#10B981', // Emerald green
                            fill: 'none'
                        }}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                );
            case 'error':
                return (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="red" 
                        strokeWidth="2" 
                        style={{
                            width: '4rem', 
                            height: '4rem', 
                            strokeWidth: 3,
                            stroke: '#EF4444', // Red
                            fill: 'none'
                        }}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                );
            default:
                return <div className="modal-spinner"></div>;
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center"
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                zIndex: 9999 
            }}
        >
            <div 
                className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center justify-center"
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '90%',
                    width: '400px'
                }}
            >
                <div 
                    className="spinner-container mb-4"
                    style={{
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {renderIcon()}
                </div>
                <h2 
                    className="text-xl font-bold text-gray-700 text-center"
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '0.5rem',
                        textAlign: 'center'
                    }}
                >
                    {message}
                </h2>
                <p 
                    className="text-gray-500 mt-2 text-center"
                    style={{
                        color: '#6b7280',
                        marginTop: '0.5rem',
                        textAlign: 'center'
                    }}
                >
                    Por favor, espera un momento
                </p>
            </div>
        </div>
    );
}
