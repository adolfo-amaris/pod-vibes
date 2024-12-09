import { GetPopularPodcastsUseCase } from './../../../src/podcastManagement/application/use-cases/GetPopularPodcastsUseCase';
import { IPodcastService } from './../../../src/podcastManagement/application/interfaces/IPodcastService';
import { Podcast } from './../../../src/podcastManagement/domain/entities/podcast';

describe('GetPopularPodcastsUseCase', () => {
    let podcastServiceMock: jest.Mocked<IPodcastService>;
    let useCase: GetPopularPodcastsUseCase;

    beforeEach(() => {
        podcastServiceMock = {
            fetchTopPodcasts: jest.fn(),
            fetchPodcastDetails: jest.fn(),
            fetchTopPodcastsWithCache: jest.fn(),
            fetchPodcastDetailsWithCache: jest.fn(),
        } as jest.Mocked<IPodcastService>;
        useCase = new GetPopularPodcastsUseCase(podcastServiceMock);
    });

    it('Debería retornar una lista de podcasts cuando el servicio funciona correctamente', async () => {
        // Datos simulados
        const mockPodcasts: Podcast[] = [
            new Podcast('1', 'Podcast A', 'Author A', 'image-url-a.jpg', 'Summary A'),
            new Podcast('2', 'Podcast B', 'Author B', 'image-url-b.jpg', 'Summary B'),
        ];

        // Configurar el mock del servicio
        podcastServiceMock.fetchTopPodcastsWithCache.mockResolvedValue(mockPodcasts);

        // Ejecutar el caso de uso
        const result = await useCase.execute();

        // Verificaciones
        expect(podcastServiceMock.fetchTopPodcastsWithCache).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockPodcasts);
    });

    it('Debería lanzar un error si el servicio falla', async () => {
        // Configurar el mock para que lance un error
        const mockError = new Error('Error al obtener los podcasts');
        podcastServiceMock.fetchTopPodcastsWithCache.mockRejectedValue(mockError);

        // Ejecutar el caso de uso y verificar que lanza el error
        await expect(useCase.execute()).rejects.toThrow('Error al obtener los podcasts');
        expect(podcastServiceMock.fetchTopPodcastsWithCache).toHaveBeenCalledTimes(1);
    });
});
