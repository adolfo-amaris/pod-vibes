import { transformPodcastDetails } from '../../../src/podcastManagement/infrastructure/transformers/podcastDetailsTransformer';
import { PodcastDetailsRawAPIResponse } from '../../../src/podcastManagement/infrastructure/types/apiResponses';

describe('Podcast Details Transformer', () => {
  it('Debería transformar datos válidos de la API en detalles de podcast y episodios', () => {
    const apiResponse = {
      results: [
        {
          wrapperType: 'track' as const, // Literal exacto
          kind: 'podcast' as const, // Literal exacto
          trackId: 123,
          trackName: 'Podcast Name',
          artistName: 'Artist Name',
          collectionName: 'Collection Name',
          artworkUrl600: 'http://artwork.url',
          description: 'Descripción del podcast',
        },
        {
          wrapperType: 'track' as const, // Literal exacto
          kind: 'podcast-episode' as const, // Literal exacto
          trackId: 1,
          trackName: 'Episode 1',
          artistName: 'Artist Name',
          collectionName: 'Collection Name',
          description: 'Descripción del episodio 1',
          releaseDate: '2024-12-01',
          trackTimeMillis: 1200000, // En milisegundos
          episodeUrl: 'http://audio1.mp3',
        },
        {
          wrapperType: 'track' as const, // Literal exacto
          kind: 'podcast-episode' as const, // Literal exacto
          trackId: 2,
          trackName: 'Episode 2',
          artistName: 'Artist Name',
          collectionName: 'Collection Name',
          description: 'Descripción del episodio 2',
          releaseDate: '2024-12-02',
          trackTimeMillis: 1500000, // En milisegundos
          episodeUrl: 'http://audio2.mp3',
        },
      ],
    };

    const result = transformPodcastDetails(apiResponse);

    expect(result.podcast.id).toBe('123');
    expect(result.podcast.title).toBe('Podcast Name');
    expect(result.podcast.author).toBe('Artist Name');
    expect(result.podcast.image).toBe('http://artwork.url');
    expect(result.podcast.summary).toBe('Descripción del podcast');

    expect(result.episodes).toHaveLength(2);

    // Validaciones del primer episodio
    expect(result.episodes[0].id).toBe('1');
    expect(result.episodes[0].title).toBe('Episode 1');
    expect(result.episodes[0].description).toBe('Descripción del episodio 1');
    expect(result.episodes[0].formatDuration()).toBe('20:00');
    expect(result.episodes[0].audioUrl).toBe('http://audio1.mp3');
    expect(result.episodes[0].releaseDate).toBe('2024-12-01');

    // Validaciones del segundo episodio
    expect(result.episodes[1].id).toBe('2');
    expect(result.episodes[1].title).toBe('Episode 2');
    expect(result.episodes[1].description).toBe('Descripción del episodio 2');
    expect(result.episodes[1].formatDuration()).toBe('25:00');
    expect(result.episodes[1].audioUrl).toBe('http://audio2.mp3');
    expect(result.episodes[1].releaseDate).toBe('2024-12-02');
  });

  it('Debería manejar datos incompletos en los episodios', () => {
    const apiResponse = {
      results: [
        {
          wrapperType: 'track' as const,
          kind: 'podcast' as const,
          trackId: 123,
          trackName: 'Podcast Name',
          artistName: 'Artist Name',
          artworkUrl600: 'http://artwork.url',
          description: 'Descripción del podcast',
          collectionName: 'Podcast Collection', // Propiedad opcional incluida
        },
        {
          wrapperType: 'track' as const,
          kind: 'podcast-episode' as const,
          trackId: 1,
          trackName: '', // Campo vacío permitido
          artistName: 'Artist Name', // Obligatorio
          description: '', // Campo vacío permitido
          releaseDate: '', // Campo vacío permitido
          trackTimeMillis: 0, // Duración en milisegundos
          episodeUrl: '', // Campo vacío permitido
          collectionName: 'Podcast Collection', // Propiedad opcional incluida
        },
      ],
    };

    const result = transformPodcastDetails(apiResponse);

    expect(result.podcast.id).toBe('123');
    expect(result.podcast.title).toBe('Podcast Name');

    expect(result.episodes).toHaveLength(1);
    expect(result.episodes[0].id).toBe('1');
    expect(result.episodes[0].title).toBe('Untitled');
    expect(result.episodes[0].description).toBe('No description available');
    expect(result.episodes[0].formatDuration()).toBe('0:00');
    expect(result.episodes[0].audioUrl).toBe('URL no disponible');
    expect(result.episodes[0].releaseDate).toBe('Unknown');
  });

  it('Debería lanzar un error si los datos de la API no son válidos', () => {
    const invalidApiResponse: Partial<PodcastDetailsRawAPIResponse> = {
      results: [], // Datos inválidos
    };

    expect(() => {
      transformPodcastDetails(
        invalidApiResponse as PodcastDetailsRawAPIResponse
      );
    }).toThrow('La respuesta de la API no contiene datos válidos.');
  });
});
