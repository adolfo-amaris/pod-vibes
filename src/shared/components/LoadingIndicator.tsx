import React from 'react';
import './../styles/loadingIndicator.scss';


const LoadingIndicator: React.FC = () => {

    return (
        <div 
            className="loading-indicator"
            role="status"
            aria-live="polite"
        >
            
        </div>
    );
};

export default LoadingIndicator;
