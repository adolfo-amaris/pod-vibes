import { GetPodcastDetailsUseCase } from './../../../src/podcastManagement/application/use-cases/GetPodcastDetailsUseCase';
import { IPodcastService } from './../../../src/podcastManagement/application/interfaces/IPodcastService';
import { Podcast } from './../../../src/podcastManagement/domain/entities/podcast';
import { Episode } from './../../../src/podcastManagement/domain/entities/episode';

describe('GetPodcastDetailsUseCase', () => {
  let podcastServiceMock: jest.Mocked<IPodcastService>;
  let useCase: GetPodcastDetailsUseCase;

  beforeEach(() => {
    podcastServiceMock = {
      fetchTopPodcasts: jest.fn(),
      fetchPodcastDetails: jest.fn(),
      fetchTopPodcastsWithCache: jest.fn(),
      fetchPodcastDetailsWithCache: jest.fn(),
    } as jest.Mocked<IPodcastService>;

    useCase = new GetPodcastDetailsUseCase(podcastServiceMock);
  });

  it('Debería retornar los detalles del podcast y sus episodios cuando el servicio funciona correctamente', async () => {
    // Datos simulados
    const mockPodcast = new Podcast(
      '1',
      'Podcast A',
      'Author A',
      'image-url-a.jpg',
      'Summary A'
    );
    const mockEpisodes: Episode[] = [
      new Episode(
        '1',
        'Episode 1',
        'Description 1',
        '2024-01-01',
        3600,
        'audio-url-1.mp3'
      ),
      new Episode(
        '2',
        'Episode 2',
        'Description 2',
        '2024-01-02',
        7200,
        'audio-url-2.mp3'
      ),
    ];

    // Configurar el mock del servicio
    podcastServiceMock.fetchPodcastDetails.mockResolvedValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
    });

    // Ejecutar el caso de uso
    const result = await useCase.execute('1');

    // Verificaciones
    expect(podcastServiceMock.fetchPodcastDetails).toHaveBeenCalledTimes(1);
    expect(podcastServiceMock.fetchPodcastDetails).toHaveBeenCalledWith('1');
    expect(result.podcast).toEqual(mockPodcast);
    expect(result.episodes).toEqual(mockEpisodes);
  });

  it('Debería lanzar un error si el ID del podcast no se proporciona', async () => {
    await expect(useCase.execute('')).rejects.toThrow(
      'El ID del podcast es requerido.'
    );
    expect(podcastServiceMock.fetchPodcastDetails).not.toHaveBeenCalled();
  });

  it('Debería lanzar un error si el servicio falla', async () => {
    // Configurar el mock para que lance un error
    const mockError = new Error('Error al obtener los detalles del podcast');
    podcastServiceMock.fetchPodcastDetails.mockRejectedValue(mockError);

    // Ejecutar el caso de uso y verificar que lanza el error
    await expect(useCase.execute('1')).rejects.toThrow(
      'Error al obtener los detalles del podcast'
    );
    expect(podcastServiceMock.fetchPodcastDetails).toHaveBeenCalledTimes(1);
  });
});
