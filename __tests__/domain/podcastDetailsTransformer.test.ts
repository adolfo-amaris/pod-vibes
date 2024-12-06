import { transformPodcastDetails } from '../../src/domain/services/podcastDetailsTransformer';

describe('Podcast Details Transformer', () => {
  it('Debería transformar datos válidos de la API en detalles de podcast y episodios', () => {
    const apiResponse = {
      details: {
        id: '123', // Cambiado a string
        name: 'Podcast Name',
        description: 'Descripción del podcast',
        artworkUrl: 'http://artwork.url',
      },
      episodes: [
        {
          id: '1',
          name: 'Episode 1',
          title: 'Episode 1',
          description: 'Descripción del episodio 1', // Agregado
          duration: 1200000, // En milisegundos
          audioUrl: 'http://audio1.mp3',
          releaseDate: '2024-12-01',
        },
        {
          id: '2',
          name: 'Episode 2',
          title: 'Episode 2',
          description: 'Descripción del episodio 2', // Agregado
          duration: 1500000, // En milisegundos
          audioUrl: 'http://audio2.mp3',
          releaseDate: '2024-12-02',
        },
      ],
    };

    const result = transformPodcastDetails(apiResponse);

    expect(result.episodes).toHaveLength(2);
    expect(result.episodes[0].id).toBe('1');
    expect(result.episodes[0].formattedDuration).toBe('20:00'); // Validación correcta
    expect(result.episodes[1].id).toBe('2');
    expect(result.episodes[1].formattedDuration).toBe('25:00');
  });
});
