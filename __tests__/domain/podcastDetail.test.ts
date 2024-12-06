import { PodcastDetail } from './../../src/podcastManagement/domain/entities/podcastDetail';
import { Episode } from './../../src/podcastManagement/domain/entities/episode';

describe('PodcastDetail', () => {
  it('debería crear una instancia válida con datos correctos', () => {
    const episodes = [
      new Episode(
        '1',
        'Episodio 1',
        'Descripción 1',
        1200,
        'audio1.mp3',
        '2023-12-01'
      ),
      new Episode(
        '2',
        'Episodio 2',
        'Descripción 2',
        1500,
        'audio2.mp3',
        '2023-12-02'
      ),
    ];
    const podcastDetail = new PodcastDetail(
      '123',
      'Podcast Name',
      'Descripción del podcast',
      'artwork.jpg',
      episodes
    );

    expect(podcastDetail.id).toBe('123');
    expect(podcastDetail.name).toBe('Podcast Name');
    expect(podcastDetail.description).toBe('Descripción del podcast');
    expect(podcastDetail.artworkUrl).toBe('artwork.jpg');
    expect(podcastDetail.episodes).toHaveLength(2);
  });

  it('debería manejar datos incompletos de episodios devolviendo un array vacío', () => {
    const podcastDetail = PodcastDetail.fromApiResponse({
      id: '123',
      name: 'Podcast Name',
      description: 'Descripción del podcast',
      artworkUrl: 'artwork.jpg',
      episodes: [], // Sin episodios
    });

    expect(podcastDetail.id).toBe('123');
    expect(podcastDetail.episodes).toEqual([]);
  });

  it('debería lanzar error si faltan datos obligatorios', () => {
    expect(
      () =>
        new PodcastDetail('', 'Podcast Name', 'Descripción', 'artwork.jpg', [])
    ).toThrow();
    expect(
      () => new PodcastDetail('123', '', 'Descripción', 'artwork.jpg', [])
    ).toThrow();
  });
});
