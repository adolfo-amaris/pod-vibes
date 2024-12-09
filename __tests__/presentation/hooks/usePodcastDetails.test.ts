import { renderHook } from '@testing-library/react-hooks';
import { usePodcastDetails } from './../../../src/podcastManagement/presentation/hooks/usePodcastDetails';
import { Podcast } from './../../../src/podcastManagement/domain/entities/podcast';
import { Episode } from './../../../src/podcastManagement/domain/entities/episode';
import { GetPodcastDetailsUseCase } from './../../../src/podcastManagement/application/use-cases/GetPodcastDetailsUseCase';

describe('usePodcastDetails', () => {
    let mockGetPodcastDetailsUseCase: jest.Mocked<GetPodcastDetailsUseCase>;

    beforeEach(() => {
        mockGetPodcastDetailsUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GetPodcastDetailsUseCase>;
    });

    it('debería inicializar correctamente con valores predeterminados', () => {
        const { result } = renderHook(() =>
            usePodcastDetails({
                podcastId: '1',
                getPodcastDetailsUseCase: mockGetPodcastDetailsUseCase,
            })
        );

        expect(result.current.podcast).toBeNull();
        expect(result.current.episodes).toEqual([]);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it('debería cargar los detalles del podcast exitosamente', async () => {
        const mockPodcast = new Podcast('1', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A');
        const mockEpisodes = [
            new Episode('1', 'Episode 1', 'Description 1', '2023-12-01', 1200, 'audio-url-1.mp3'),
            new Episode('2', 'Episode 2', 'Description 2', '2023-12-02', 1500, 'audio-url-2.mp3'),
        ];

        mockGetPodcastDetailsUseCase.execute.mockResolvedValue({
            podcast: mockPodcast,
            episodes: mockEpisodes,
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            usePodcastDetails({
                podcastId: '1',
                getPodcastDetailsUseCase: mockGetPodcastDetailsUseCase,
            })
        );

        await waitForNextUpdate();

        expect(result.current.podcast).toEqual(mockPodcast);
        expect(result.current.episodes).toEqual(mockEpisodes);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('debería manejar un error al obtener los detalles del podcast', async () => {
        mockGetPodcastDetailsUseCase.execute.mockRejectedValue(new Error('Error de red'));

        const { result, waitForNextUpdate } = renderHook(() =>
            usePodcastDetails({
                podcastId: '1',
                getPodcastDetailsUseCase: mockGetPodcastDetailsUseCase,
            })
        );

        await waitForNextUpdate();

        expect(result.current.podcast).toBeNull();
        expect(result.current.episodes).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Error al obtener los detalles del podcast.');
    });

    it('debería manejar detalles del podcast incompletos', async () => {
        mockGetPodcastDetailsUseCase.execute.mockResolvedValue({
            podcast: null, // Aquí se especifica que podcast puede ser null
            episodes: [],
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            usePodcastDetails({
                podcastId: '1',
                getPodcastDetailsUseCase: mockGetPodcastDetailsUseCase,
            })
        );

        await waitForNextUpdate();

        expect(result.current.podcast).toBeNull();
        expect(result.current.episodes).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Detalles del podcast o episodios no disponibles.');
    });
});
