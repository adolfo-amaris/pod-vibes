/* eslint-env jest */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PopularPodcastsPage from '../../src/podcastManagement/presentation/pages/PopularPodcastsPage';
import { podcastService } from '../../src/podcastManagement/infrastructure/repositories/podcastServiceImpl';
import { LoadingProvider } from '../../src/shared/context/LoadingContext';
import { NavigationProvider } from '../../src/podcastManagement/presentation/context/NavigationContext';
import { PodcastServiceProvider } from '../../src/podcastManagement/infrastructure/context/PodcastServiceContext';

jest.mock(
  './../../src/podcastManagement/infrastructure/repositories/podcastService'
);

describe('PopularPodcastsPage Component', () => {
  const mockPodcasts = [
    {
      id: '1',
      title: 'Podcast 1',
      author: 'Author 1',
      image: 'img1.jpg',
      description: 'Description 1',
    },
    {
      id: '2',
      title: 'Podcast 2',
      author: 'Author 2',
      image: 'img2.jpg',
      description: 'Description 2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock completo de localStorage
    const localStorageMock = {
      getItem: jest.fn((key) => {
        if (key === 'podcasts') {
          return JSON.stringify(mockPodcasts);
        }
        if (key === 'podcastsTimestamp') {
          return Date.now().toString();
        }
        return null;
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });

    jest
      .spyOn(podcastService, 'fetchTopPodcastsWithCache')
      .mockResolvedValue(mockPodcasts);
  });

  it('renderiza correctamente la página inicial con datos de caché', async () => {
    await act(async () => {
      render(
        <Router
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <LoadingProvider>
            <PodcastServiceProvider>
              <NavigationProvider>
                <PopularPodcastsPage />
              </NavigationProvider>
            </PodcastServiceProvider>
          </LoadingProvider>
        </Router>
      );
    });

    // Verificar que el localStorage contiene datos
    expect(localStorage.getItem).toHaveBeenCalledWith('podcasts');
    expect(localStorage.getItem('podcasts')).not.toBeNull();

    // Verificar que los podcasts del caché se renderizan
    expect(await screen.findByText('Podcast 1')).toBeInTheDocument();
    expect(await screen.findByText('Podcast 2')).toBeInTheDocument();
  });

  it('llama a la API si no hay caché disponible', async () => {
    global.localStorage.getItem = jest.fn(() => null); // Simular caché vacío

    await act(async () => {
      render(
        <Router
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <LoadingProvider>
            <PodcastServiceProvider>
              <NavigationProvider>
                <PopularPodcastsPage />
              </NavigationProvider>
            </PodcastServiceProvider>
          </LoadingProvider>
        </Router>
      );
    });

    expect(podcastService.fetchTopPodcastsWithCache).toHaveBeenCalled();
  });
});
