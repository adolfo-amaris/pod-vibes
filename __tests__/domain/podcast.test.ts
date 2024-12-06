import { transformPodcastDetails } from '../../src/domain/services/podcastDetailsTransformer';

describe('Transformador de Detalles del Podcast', () => {
  it('Debería transformar datos válidos de la API en detalles de podcast y episodios', () => {
    // Datos simulados de respuesta de la API
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
          name: 'Episodio 1',
          description: 'Descripción del episodio 1',
          duration: 1200000,
          audioUrl: 'http://audio1.url',
          releaseDate: '2023-12-01',
        },
        {
          id: '2',
          name: 'Episodio 2',
          description: 'Descripción del episodio 2',
          duration: 1500000,
          audioUrl: 'http://audio2.url',
          releaseDate: '2023-12-02',
        },
      ],
    };

    // Transformación de los datos
    const result = transformPodcastDetails(apiResponse);

    // Verificaciones de los detalles del podcast
    expect(result.details.id).toBe('123');
    expect(result.details.name).toBe('Podcast Name');
    expect(result.details.description).toBe('Descripción del podcast');
    expect(result.details.artworkUrl).toBe('http://artwork.url');

    // Verificaciones de los episodios
    expect(result.episodes).toHaveLength(2); // Deben haber dos episodios
    expect(result.episodes[0].id).toBe('1');
    expect(result.episodes[0].formattedDuration).toBe('20:00'); // Duración formateada en MM:SS
    expect(result.episodes[1].id).toBe('2');
    expect(result.episodes[1].formattedDuration).toBe('25:00');
  });
});
