import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PopularPodcastsPage from './../../../src/podcastManagement/presentation/pages/PopularPodcastsPage';
import { Podcast } from './../../../src/podcastManagement/domain/entities/podcast';
import { LoadingContext } from './../../../src/shared/context/LoadingContext';

jest.mock(
  '../../../src/podcastManagement/presentation/hooks/usePopularPodcasts',
  () => ({
    usePopularPodcasts: jest.fn(),
  })
);

const mockPodcasts: Podcast[] = [
  new Podcast('1', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A'),
  new Podcast('2', 'Podcast B', 'Author B', 'image-b.jpg', 'Summary B'),
];

describe('PopularPodcastsPage', () => {
  const mockSetLoading = jest.fn();

  const renderWithProviders = (loading = false) =>
    render(
      <LoadingContext.Provider value={{ loading, setLoading: mockSetLoading }}>
        <BrowserRouter>
          <PopularPodcastsPage />
        </BrowserRouter>
      </LoadingContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería mostrar un mensaje de carga al iniciar', async () => {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const {
      usePopularPodcasts,
    } = require('../../../src/podcastManagement/presentation/hooks/usePopularPodcasts');
    /* eslint-enable @typescript-eslint/no-require-imports */
    usePopularPodcasts.mockReturnValue({
      podcasts: [],
      error: null,
    });

    renderWithProviders(true);

    expect(
      screen.getByText('Cargando los podcasts más populares...')
    ).toBeInTheDocument();
  });

  it('debería cargar y mostrar los podcasts desde el hook', async () => {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const {
      usePopularPodcasts,
    } = require('../../../src/podcastManagement/presentation/hooks/usePopularPodcasts');
    /* eslint-enable @typescript-eslint/no-require-imports */
    usePopularPodcasts.mockReturnValue({
      podcasts: mockPodcasts,
      error: null,
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getAllByText(/Podcast/)).toHaveLength(2);
    });
  });

  it('debería navegar al detalle del podcast al hacer clic en una tarjeta', async () => {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const {
      usePopularPodcasts,
    } = require('../../../src/podcastManagement/presentation/hooks/usePopularPodcasts');
    /* eslint-enable @typescript-eslint/no-require-imports */

    usePopularPodcasts.mockReturnValue({
      podcasts: mockPodcasts, // Asegúrate de que hay dos podcasts en los datos
      error: null,
    });

    renderWithProviders();

    await waitFor(() => {
      // Verifica que se renderizan ambos elementos con "Podcast"
      expect(screen.getAllByText(/Podcast/)).toHaveLength(2);
    });

    // Simula clic en la primera tarjeta
    fireEvent.click(screen.getAllByText(/Podcast A/)[0]);

    // Verifica la navegación al detalle del podcast
    expect(window.location.pathname).toBe('/podcast/1');
  });
});
