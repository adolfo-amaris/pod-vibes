import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './../../../src/podcastManagement/presentation/components/Filter';

describe('Filter Component', () => {
    const mockSetFilter = jest.fn();

    const renderComponent = ({
        filter = '',
        placeholder = 'Filter...',
        count = 0,
    } = {}) =>
        render(
            <Filter
                filter={filter}
                setFilter={mockSetFilter}
                placeholder={placeholder}
                count={count}
            />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debería renderizar el componente correctamente con valores predeterminados', () => {
        renderComponent();

        expect(screen.getByPlaceholderText('Filter...')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('debería mostrar el texto del placeholder proporcionado', () => {
        const placeholder = 'Buscar podcasts...';
        renderComponent({ placeholder });

        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('debería mostrar el conteo correcto', () => {
        renderComponent({ count: 10 });

        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('debería llamar a `setFilter` cuando el usuario escribe en el campo de entrada', () => {
        renderComponent();

        const input = screen.getByPlaceholderText('Filter...');
        fireEvent.change(input, { target: { value: 'Podcast A' } });

        expect(mockSetFilter).toHaveBeenCalledWith('Podcast A');
        expect(mockSetFilter).toHaveBeenCalledTimes(1);
    });

    it('debería renderizar correctamente con un valor inicial de filtro', () => {
        renderComponent({ filter: 'Podcast B' });

        const input = screen.getByPlaceholderText('Filter...');
        expect(input).toHaveValue('Podcast B');
    });
});
