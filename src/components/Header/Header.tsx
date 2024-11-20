import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useLoading } from '../../context/LoadingContext';
import './../../styles/header.scss';


const Header: React.FC = () => {

    const { loading } = useLoading(); // Acceder al estado de carga

    return (
        <header className='header flex-center justify-between'>
            <Link to="/" className='header__a'>
                Podcaster
            </Link>
            {loading && <LoadingIndicator />}
        </header>
    );
};



export default Header;
