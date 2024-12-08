import { IPodcastService } from './../../application/interfaces/IPodcastService';
import { Podcast } from '../../domain/entities/podcast';
import { Episode } from '../../domain/entities/episode';

export class GetPodcastDetailsUseCase {
  private podcastService: IPodcastService;

  constructor(podcastService: IPodcastService) {
    this.podcastService = podcastService;
  }

  async execute(
    podcastId: string
  ): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    if (!podcastId) {
      throw new Error('El ID del podcast es requerido.');
    }

    return await this.podcastService.fetchPodcastDetails(podcastId);
  }
}
