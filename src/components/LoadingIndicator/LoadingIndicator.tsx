import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div style={spinnerStyle}>
            <span>Cargando...</span>
        </div>
    );
};

const spinnerStyle: React.CSSProperties = {
    textAlign: 'center', // Asegúrate de que este sea un valor válido
    margin: '20px',
    fontSize: '18px',
    color: '#666',
};

export default LoadingIndicator;
