import { transformPodcastDetails } from '../../src/podcastManagement/infrastructure/transformers/podcastDetailsTransformer';

describe('Podcast Details Transformer', () => {
  it('Debería transformar datos válidos de la API en detalles de podcast y episodios', () => {
    const apiResponse = {
      details: {
        id: '123',
        name: 'Podcast Name',
        description: 'Descripción del podcast',
        artworkUrl: 'http://artwork.url',
      },
      episodes: [
        {
          id: '1',
          title: 'Episode 1',
          description: 'Descripción del episodio 1',
          duration: 1200000,
          audioUrl: 'http://audio1.mp3',
          releaseDate: '2024-12-01',
        },
        {
          id: '2',
          title: 'Episode 2',
          description: 'Descripción del episodio 2',
          duration: 1500000,
          audioUrl: 'http://audio2.mp3',
          releaseDate: '2024-12-02',
        },
      ],
    };

    const result = transformPodcastDetails(apiResponse);

    expect(result.episodes).toHaveLength(2);
    expect(result.episodes[0].id).toBe('1');
    expect(result.episodes[0].formattedDuration).toBe('20:00');
    expect(result.episodes[1].id).toBe('2');
    expect(result.episodes[1].formattedDuration).toBe('25:00');
  });

  it('Debería lanzar un error si los datos son incompletos', () => {
    const apiResponse = {
      details: {
        id: '',
        name: '',
        description: '',
        artworkUrl: '',
      },
      episodes: [],
    };

    expect(() => transformPodcastDetails(apiResponse)).toThrow(
      'Los datos del detalle del podcast no son válidos.'
    );
  });

  it('Debería usar la imagen predeterminada si falta el artworkUrl', () => {
    const apiResponse = {
      details: {
        id: '123',
        name: 'Podcast Name',
        description: 'Descripción del podcast',
        artworkUrl: '',
      },
      episodes: [],
    };

    const result = transformPodcastDetails(apiResponse);
    expect(result.details.artworkUrl).toBe('/default-image.jpg');
  });

  it('Debería manejar un episodio sin descripción', () => {
    const apiResponse = {
      details: {
        id: '123',
        name: 'Podcast Name',
        description: 'Descripción del podcast',
        artworkUrl: 'http://artwork.url',
      },
      episodes: [
        {
          id: '1',
          name: 'Episode 1',
          title: 'Episode 1',
          description: undefined,
          duration: 1200000,
          audioUrl: 'http://audio1.mp3',
          releaseDate: '2024-12-01',
        },
      ],
    };

    const result = transformPodcastDetails(apiResponse);
    expect(result.episodes[0].description).toBe('Descripción no disponible.');
  });
});
