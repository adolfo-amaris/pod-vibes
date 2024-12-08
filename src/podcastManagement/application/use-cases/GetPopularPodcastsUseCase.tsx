import { IPodcastService } from '../interfaces/IPodcastService';
import { Podcast } from '../../domain/entities/podcast';

export class GetPopularPodcastsUseCase {
    constructor(private readonly podcastService: IPodcastService) { }

    async execute(): Promise<Podcast[]> {
        // Utiliza el servicio para obtener los podcasts
        const podcasts = await this.podcastService.fetchTopPodcastsWithCache();

        // Retorna los podcasts directamente (ya están en formato de entidad)
        return podcasts;
    }
}
