import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PodcastCard from './../../../src/podcastManagement/presentation/components/PodcastCard';

describe('PodcastCard Component', () => {
    const mockOnClick = jest.fn();

    const renderComponent = ({
        image = 'http://example.com/image.jpg',
        title = 'Podcast Title',
        author = 'Podcast Author',
    } = {}) =>
        render(
            <PodcastCard
                image={image}
                title={title}
                author={author}
                onClick={mockOnClick}
            />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debería renderizar correctamente la tarjeta con los datos proporcionados', () => {
        renderComponent();

        expect(screen.getByRole('img', { name: 'Podcast Title' })).toBeInTheDocument();
        expect(screen.getByText('Podcast Title')).toBeInTheDocument();
        expect(screen.getByText('Author: Podcast Author')).toBeInTheDocument();
    });

    it('debería manejar el evento de clic correctamente', () => {
        renderComponent();

        const card = screen.getByRole('img', { name: 'Podcast Title' }).closest('div');
        fireEvent.click(card!);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('debería renderizar una imagen con el atributo alt igual al título', () => {
        renderComponent();

        const image = screen.getByRole('img', { name: 'Podcast Title' });
        expect(image).toHaveAttribute('src', 'http://example.com/image.jpg');
        expect(image).toHaveAttribute('alt', 'Podcast Title');
    });

    it('debería renderizar correctamente cuando se proporciona un autor vacío', () => {
        renderComponent({ author: '' });

        expect(screen.getByText('Author:')).toBeInTheDocument();
    });
});
