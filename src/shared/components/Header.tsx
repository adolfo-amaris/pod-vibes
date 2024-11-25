import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import { useLoading } from './../context/LoadingContext';
import useHomeNavigation from './../hooks/useHomeNavigation';
import './../styles/header.scss';


function Header() {
    const { handleHomeClick } = useHomeNavigation();
    const { loading } = useLoading(); // Acceder al estado de carga
    const navigate = useNavigate(); // Hook for navigation


    return (
        <header className='header flex-center justify-between'>
            <Link
                to="/"
                className='header__a'
                onClick={(e) => {
                    e.preventDefault();
                    handleHomeClick();
                    navigate("/");
                }}
            >
                Podcaster
            </Link>
            {loading && <LoadingIndicator />}
        </header>
    );
}



export default Header;
