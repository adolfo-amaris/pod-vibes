import axios from 'axios';
import { IPodcastService } from '../../application/interfaces/IPodcastService';
import { CacheManager } from './../services/CacheManager';
import {
  PodcastAPIResponse,
  PodcastDetailsAPIResponse,
  PodcastDetailsRawAPIResponse,
  PodcastFeedResponse,
} from '../../domain/types/apiResponses';
import { Podcast } from '../../domain/entities/podcast';
import { transformPodcasts } from '../../domain/services/podcastTransformer';

// Clase para manejar la lógica del servicio
export class PodcastService implements IPodcastService {
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
    const data = await this.fetchFromApi<PodcastFeedResponse>(endpoint);

    // Validar que los datos contengan `feed.entry`
    if (!data || !data.feed || !Array.isArray(data.feed.entry)) {
      throw new Error('La respuesta de la API no contiene un formato válido.');
    }

    return transformPodcasts(data.feed.entry as PodcastAPIResponse[]);
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
  public async fetchPodcastDetails(
    podcastId: string
  ): Promise<PodcastDetailsAPIResponse> {
    const endpoint = `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const rawData =
      await this.fetchFromApi<PodcastDetailsRawAPIResponse>(endpoint);

    if (
      !rawData ||
      !rawData.results ||
      !Array.isArray(rawData.results) ||
      rawData.results.length === 0
    ) {
      throw new Error('La respuesta de la API no contiene datos válidos.');
    }

    const [details, ...episodes] = rawData.results;

    if (
      !details ||
      details.wrapperType !== 'track' ||
      details.kind !== 'podcast'
    ) {
      throw new Error('El campo `details` no contiene un podcast válido.');
    }

    return {
      details: {
        id: details.trackId.toString(),
        name: details.trackName,
        description: details.collectionName || 'Sin descripción',
        artworkUrl: details.artworkUrl600 || '',
      },
      episodes: episodes.map((episode) => ({
        id: episode.trackId.toString(),
        name: episode.trackName || 'Sin título',
        description: episode.description || 'Descripción no disponible.',
        duration: episode.trackTimeMillis || 0,
        audioUrl: episode.episodeUrl || '',
        releaseDate: episode.releaseDate || 'Fecha desconocida',
      })),
    };
  }

  // Obtener detalles del podcast con caché
  public async fetchPodcastDetailsWithCache(
    podcastId: string
  ): Promise<PodcastDetailsAPIResponse> {
    const cacheKey = `podcast_${podcastId}`;
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
    const cachedData = this.cacheManager.getCache<PodcastDetailsAPIResponse>(
      cacheKey,
      cacheDuration
    );

    if (cachedData) return cachedData;

    const data = await this.fetchPodcastDetails(podcastId);
    this.cacheManager.setCache(cacheKey, data);
    return data;
  }
}

// Instancia del servicio exportada
export const podcastService = new PodcastService();
