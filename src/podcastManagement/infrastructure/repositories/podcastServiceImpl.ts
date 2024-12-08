import axios from 'axios';
import { IPodcastService } from '../../application/interfaces/IPodcastService';
import { CacheManager } from '../services/CacheManager';
import {
  PodcastDetailsRawAPIResponse,
  PodcastFeedAPIResponse,
} from '../types/apiResponses';
import { Podcast } from '../../domain/entities/podcast';
import { Episode } from '../../domain/entities/episode';
import { transformPodcasts } from '../transformers/podcastTransformer';
import { transformPodcastDetails } from '../transformers/podcastDetailsTransformer';

// Clase para manejar la lógica del servicio
export class PodcastServiceImpl implements IPodcastService {
  private baseUrl: string;
  private proxyUrl: string;
  private httpClient: typeof axios;
  private cacheManager: CacheManager;

  constructor(httpClient = axios, cacheManager = new CacheManager()) {
    this.baseUrl = 'https://itunes.apple.com';
    this.proxyUrl = 'https://api.allorigins.win/get?url=';
    this.httpClient = httpClient;
    this.cacheManager = cacheManager;
  }

  // Método privado para manejar las solicitudes
  private async fetchFromApi<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.proxyUrl}${encodeURIComponent(this.baseUrl + endpoint)}`;
      const response = await this.httpClient.get(url);
      return JSON.parse(response.data.contents) as T;
    } catch (error) {
      console.error('Error al obtener datos desde la API:', error);
      throw error;
    }
  }

  // Obtener los podcasts más populares
  public async fetchTopPodcasts(): Promise<Podcast[]> {
    const endpoint = '/us/rss/toppodcasts/limit=100/genre=1310/json';
    const data = await this.fetchFromApi<PodcastFeedAPIResponse>(endpoint);

    // Validar que los datos contengan `feed.entry`
    if (!data || !data.feed || !Array.isArray(data.feed.entry)) {
      throw new Error('La respuesta de la API no contiene un formato válido.');
    }

    return transformPodcasts(data);
  }

  // Obtener los podcasts más populares con caché
  public async fetchTopPodcastsWithCache(): Promise<Podcast[]> {
    const cacheKey = 'podcasts';
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
    const cachedData = this.cacheManager.getCache<Podcast[]>(
      cacheKey,
      cacheDuration
    );

    if (cachedData) return cachedData;

    const data = await this.fetchTopPodcasts();
    this.cacheManager.setCache(cacheKey, data);
    return data;
  }

  // Obtener detalles de un podcast
  public async fetchPodcastDetails(podcastId: string): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    const endpoint = `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const rawData: PodcastDetailsRawAPIResponse = await this.fetchFromApi<PodcastDetailsRawAPIResponse>(endpoint);

    if (!rawData || !rawData.results || !Array.isArray(rawData.results) || rawData.results.length === 0) {
      throw new Error('La respuesta de la API no contiene datos válidos.');
    }

    const { podcast, episodes } = transformPodcastDetails(rawData);

    return {
      podcast,
      episodes,
    };
  }

  // Obtener detalles del podcast con caché
  public async fetchPodcastDetailsWithCache(
    podcastId: string
  ): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    const cacheKey = `podcast_${podcastId}`;
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
    const cachedData = this.cacheManager.getCache<{ podcast: Podcast; episodes: Episode[] }>(cacheKey, cacheDuration);

    if (cachedData) return cachedData;

    const data = await this.fetchPodcastDetails(podcastId);
    this.cacheManager.setCache(cacheKey, data);
    return data;
  }
}

// Instancia del servicio exportada
export const podcastServiceImpl = new PodcastServiceImpl();
