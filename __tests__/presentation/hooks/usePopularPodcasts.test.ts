import { renderHook, waitFor } from '@testing-library/react';
import { usePopularPodcasts } from '../../../src/podcastManagement/presentation/hooks/usePopularPodcasts';
import { Podcast } from '../../../src/podcastManagement/domain/entities/podcast';
import { GetPopularPodcastsUseCase } from '../../../src/podcastManagement/application/use-cases/GetPopularPodcastsUseCase';
import { usePodcastUseCases } from '../../../src/podcastManagement/presentation/context/PodcastProvider';
import { useLoading } from '../../../src/shared/context/LoadingContext';

jest.mock(
  '../../../src/podcastManagement/presentation/context/PodcastProvider'
);
jest.mock('../../../src/shared/context/LoadingContext');

describe('usePopularPodcasts', () => {
  let mockGetPopularPodcastsUseCase: jest.Mocked<GetPopularPodcastsUseCase>;
  let mockSetLoading: jest.Mock;

  beforeEach(() => {
    mockGetPopularPodcastsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPopularPodcastsUseCase>;

    mockSetLoading = jest.fn();

    (usePodcastUseCases as jest.Mock).mockReturnValue({
      getPopularPodcastsUseCase: mockGetPopularPodcastsUseCase,
    });

    (useLoading as jest.Mock).mockReturnValue({
      setLoading: mockSetLoading,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('debería inicializar correctamente con valores vacíos', async () => {
    const { result } = renderHook(() => usePopularPodcasts());

    // Verifica que el estado inicial está vacío
    expect(result.current.podcasts).toEqual([]);
    expect(result.current.error).toBeNull();

    // Verifica que setLoading(true) se llamó al inicializar el efecto
    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });

    // Verifica que setLoading(false) se llamó al finalizar
    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('debería cargar los podcasts desde localStorage si existen', async () => {
    const mockPodcasts: Podcast[] = [
      new Podcast('1', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A'),
    ];

    localStorage.setItem('podcasts', JSON.stringify(mockPodcasts));

    const { result } = renderHook(() => usePopularPodcasts());

    await waitFor(() => {
      expect(result.current.podcasts).toEqual(mockPodcasts);
    });

    // Verifica que setLoading se llama al iniciar y finalizar
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(result.current.error).toBeNull();
  });

  it('debería cargar los podcasts desde el caso de uso si no están en localStorage', async () => {
    const mockPodcasts: Podcast[] = [
      new Podcast('1', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A'),
    ];

    mockGetPopularPodcastsUseCase.execute.mockResolvedValue(mockPodcasts);

    const { result } = renderHook(() => usePopularPodcasts());

    await waitFor(() => {
      expect(result.current.podcasts).toEqual(mockPodcasts);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('podcasts')).toEqual(
      JSON.stringify(mockPodcasts)
    );
    expect(result.current.error).toBeNull();
  });

  it('debería manejar un error al obtener los podcasts', async () => {
    mockGetPopularPodcastsUseCase.execute.mockRejectedValue(
      new Error('Error de red')
    );

    const { result } = renderHook(() => usePopularPodcasts());

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Error al obtener los podcasts más populares.'
      );
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(result.current.podcasts).toEqual([]);
  });
});
