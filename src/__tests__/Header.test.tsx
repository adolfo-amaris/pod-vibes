import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../context/LoadingContext';
import Header from '../components/Header/Header';

describe('Header Component', () => {
    test('muestra el texto Podcaster en el header', () => {
        render(
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}>
                <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
                    <Header />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        const title = screen.getByText(/Podcaster/i);
        expect(title).toBeInTheDocument();
    });

    test('muestra el indicador de carga cuando está cargando', () => {
        render(
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}>
                <LoadingContext.Provider value={{ loading: true, setLoading: jest.fn() }}>
                    <Header />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        const loadingIndicator = screen.getByRole('status');
        expect(loadingIndicator).toBeInTheDocument();
    });

    test('no muestra el indicador de carga cuando no está cargando', () => {
        render(
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}>
                <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
                    <Header />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        const loadingIndicator = screen.queryByRole('status');
        expect(loadingIndicator).not.toBeInTheDocument();
    });
});