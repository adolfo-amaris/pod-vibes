import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EpisodeDetailPage from '../../../src/podcastManagement/presentation/pages/EpisodeDetailPage';
import { LoadingContext } from '../../../src/shared/context/LoadingContext';
import { PodcastProvider } from '../../../src/podcastManagement/presentation/context/PodcastProvider';
import { PodcastServiceProvider } from './../../../src/podcastManagement/infrastructure/context/PodcastServiceContext';
import { Episode } from '../../../src/podcastManagement/domain/entities/episode';

jest.mock('./../../../src/podcastManagement/presentation/hooks/usePodcastDetails', () => ({
    usePodcastDetails: jest.fn(),
}));

const mockUsePodcastDetails = require('./../../../src/podcastManagement/presentation/hooks/usePodcastDetails').usePodcastDetails;

describe('EpisodeDetailPage', () => {
    const mockEpisodes = [
        new Episode('1', 'Episode 1', 'Description 1', '2024-01-01', 3600, 'audio-url-1.mp3'),
        new Episode('2', 'Episode 2', 'Description 2', '2024-01-02', 7200, 'audio-url-2.mp3'),
    ];

    const renderWithProviders = (path = '/podcast/1/episode/1') =>
        render(
            <MemoryRouter
                initialEntries={[path]}
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}
            >
                <PodcastServiceProvider>
                    <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
                        <PodcastProvider>
                            <Routes>
                                <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailPage />} />
                            </Routes>
                        </PodcastProvider>
                    </LoadingContext.Provider>
                </PodcastServiceProvider>
            </MemoryRouter>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debería mostrar un mensaje de carga al iniciar', async () => {
        mockUsePodcastDetails.mockReturnValue({
            episodes: null,
            loading: true,
            error: null,
        });

        renderWithProviders();

        expect(screen.getByText('Cargando episodio...')).toBeInTheDocument();
    });

    it('debería manejar un error al cargar el episodio', async () => {
        mockUsePodcastDetails.mockReturnValue({
            episodes: null,
            loading: false,
            error: 'Error al cargar el episodio seleccionado.',
        });

        renderWithProviders();

        expect(
            screen.getByText('Error al cargar el episodio seleccionado.')
        ).toBeInTheDocument();
    });

    it('debería mostrar un mensaje si el episodio no se encuentra', async () => {
        mockUsePodcastDetails.mockReturnValue({
            episodes: mockEpisodes,
            loading: false,
            error: null,
        });

        renderWithProviders('/podcast/1/episode/3');

        expect(screen.getByText('Episodio no encontrado.')).toBeInTheDocument();
    });

    it('debería renderizar los detalles del episodio correctamente', async () => {
        mockUsePodcastDetails.mockReturnValue({
            episodes: mockEpisodes,
            loading: false,
            error: null,
        });

        renderWithProviders();

        expect(screen.getByText('Episode 1')).toBeInTheDocument();

        // Usar un matcher personalizado para manejar texto dividido
        expect(
            screen.getByText((content) =>
                content.includes('Fecha de publicación:') &&
                content.includes('1/1/2024')
            )
        ).toBeInTheDocument();

        expect(screen.getByText('Description 1')).toBeInTheDocument();

        // Usar querySelector para encontrar el reproductor de audio
        const audioElement = document.querySelector('audio');
        expect(audioElement).toBeInTheDocument();
    });
});
