import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useLoading } from '../../context/LoadingContext';
import useHomeNavigation from '../../hook/useHomeNavigation';
import './../../styles/header.scss';


function Header() {
    const { handleHomeClick } = useHomeNavigation();
    const { loading } = useLoading(); // Acceder al estado de carga


    return (
        <header className='header flex-center justify-between'>
            <Link
                to="/"
                className='header__a'
                onClick={(e) => {
                    e.preventDefault();
                    handleHomeClick();
                } }
            >
                Podcaster
            </Link>
            {loading && <LoadingIndicator />}
        </header>
    );
}



export default Header;
