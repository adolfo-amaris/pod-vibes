import { transformPodcasts } from './../../src/domain/services/podcastTransformer';

describe('Podcast Transformer', () => {
  it('Debería manejar errores individuales y continuar transformando datos válidos', () => {
    const rawData = [
      {
        id: { attributes: { 'im:id': '1' } },
        'im:name': { label: 'Valid Podcast' },
        'im:artist': { label: 'Jane Doe' },
        'im:image': [
          { label: 'http://image.small.url' },
          { label: 'http://image.medium.url' },
          { label: 'http://image.valid.url' },
        ],
      },
      {
        id: null, // Dato inválido
        'im:name': { label: null },
        'im:artist': { label: 'Invalid Artist' },
        'im:image': [], // Array vacío
      },
    ];

    const podcasts = transformPodcasts(rawData);

    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].title).toBe('Valid Podcast');
    expect(podcasts[0].author).toBe('Jane Doe');
    expect(podcasts[0].image).toBe('http://image.valid.url');
  });
});
