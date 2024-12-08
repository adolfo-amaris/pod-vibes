import { transformPodcasts } from './../../../src/podcastManagement/infrastructure/transformers/podcastTransformer';
import { PodcastFeedAPIResponse } from './../../../src/podcastManagement/infrastructure/types/apiResponses';

describe('transformPodcasts', () => {
  it('debería transformar una respuesta válida de la API en una lista de Podcasts', () => {
    const apiResponse: PodcastFeedAPIResponse = {
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '1' } },
            'im:name': { label: 'Tech Talks' },
            'im:image': [{ label: 'url', attributes: { height: '170' } }],
            'im:artist': { label: 'John Doe' },
            summary: { label: 'A podcast about tech' },
          },
        ],
      },
    };

    const podcasts = transformPodcasts(apiResponse);

    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].id).toBe('1');
    expect(podcasts[0].title).toBe('Tech Talks');
    expect(podcasts[0].author).toBe('John Doe');
    expect(podcasts[0].image).toBe('url');
    expect(podcasts[0].summary).toBe('A podcast about tech');
  });

  it('debería filtrar podcasts con datos incompletos', () => {
    const apiResponse: PodcastFeedAPIResponse = {
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '1' } },
            'im:name': { label: 'Tech Talks' },
            'im:image': [],
            'im:artist': { label: 'John Doe' },
            summary: { label: '' },
          },
        ],
      },
    };

    const podcasts = transformPodcasts(apiResponse);

    expect(podcasts).toHaveLength(0);
  });
});
