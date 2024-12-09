import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PodcastDetailPage from './../../../src/podcastManagement/presentation/pages/PodcastDetailPage';
import { LoadingContext } from './../../../src/shared/context/LoadingContext';
import { PodcastProvider } from './../../../src/podcastManagement/presentation/context/PodcastProvider';
import { PodcastServiceProvider } from '././../../../src/podcastManagement/infrastructure/context/PodcastServiceContext';
import { Podcast } from './../../../src/podcastManagement/domain/entities/podcast';
import { Episode } from './../../../src/podcastManagement/domain/entities/episode';

jest.mock('./../../../src/podcastManagement/presentation/hooks/usePodcastDetails', () => ({
    usePodcastDetails: jest.fn(),
}));

const mockUsePodcastDetails = require('./../../../src/podcastManagement/presentation/hooks/usePodcastDetails').usePodcastDetails;

describe('PodcastDetailPage', () => {
    const mockPodcast = new Podcast(
        '1',
        'Podcast A',
        'Author A',
        'image-url-a.jpg',
        'Summary A'
    );

    const mockEpisodes = [
        new Episode('1', 'Episode 1', 'Description 1', '2024-01-01', 3600, 'audio-url-1.mp3'),
        new Episode('2', 'Episode 2', 'Description 2', '2024-01-02', 7200, 'audio-url-2.mp3'),
    ];


    it('debería navegar al detalle de un episodio al hacer clic en un episodio', async () => {
        mockUsePodcastDetails.mockReturnValue({
            podcast: mockPodcast,
            episodes: mockEpisodes,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter
                initialEntries={['/podcast/1']}
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}
            >
                <PodcastServiceProvider>
                    <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
                        <PodcastProvider>
                            <Routes>
                                <Route path="/podcast/:podcastId/*" element={<PodcastDetailPage />} />
                                <Route
                                    path="/podcast/:podcastId/episode/:episodeId"
                                    element={<div>Detalle del episodio</div>}
                                />
                            </Routes>
                        </PodcastProvider>
                    </LoadingContext.Provider>
                </PodcastServiceProvider>
            </MemoryRouter>
        );

        // Simula clic en el episodio
        fireEvent.click(screen.getByText('Episode 1'));

        // Verifica que el contenido del detalle del episodio aparece
        await waitFor(() => {
            expect(screen.getByText('Detalle del episodio')).toBeInTheDocument();
        });
    });
});
