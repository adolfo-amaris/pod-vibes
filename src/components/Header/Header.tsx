import React from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';


const Header: React.FC = () => {
    
    const { loading } = useLoading(); // Acceder al estado de carga

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                <Link to="/" style={titleStyle}>
                    Pod Vibes
                </Link>
                <div style={loadingStyle}>{loading && 'Cargando...'}</div>
            </div>
        </header>
    );
};

const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const titleStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
};

const loadingStyle = {
    fontSize: '14px',
    color: '#ccc',
};

export default Header;
