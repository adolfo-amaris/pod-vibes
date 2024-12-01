import axios from 'axios';
import { transformPodcastDetails } from '../../domain/services/podcastDetailsTransformer';
import { IPodcastService } from '../../application/interfaces/IPodcastService';
import { CacheManager } from './../services/CacheManager';

// Clase para manejar la lógica del servicio
export class PodcastService implements IPodcastService {
	private baseUrl: string;
	private proxyUrl: string;
	private httpClient: any;
	private cacheManager: CacheManager;


	constructor(httpClient = axios, cacheManager = new CacheManager()) {
		this.baseUrl = 'https://itunes.apple.com';
		this.proxyUrl = 'https://api.allorigins.win/get?url=';
		this.httpClient = httpClient;
		this.cacheManager = cacheManager;
	}

	// Método privado para manejar las solicitudes
	private async fetchFromApi(endpoint: string): Promise<any> {
		try {
			const url = `${this.proxyUrl}${encodeURIComponent(this.baseUrl + endpoint)}`;
			const response = await this.httpClient.get(url);
			return JSON.parse(response.data.contents);
		} catch (error) {
			console.error('Error al obtener datos desde la API:', error);
			throw error;
		}
	}

	// Obtener los podcasts más populares
	public async fetchTopPodcasts(): Promise<any> {
		const endpoint = '/us/rss/toppodcasts/limit=100/genre=1310/json';
		const data = await this.fetchFromApi(endpoint);
		return data.feed.entry; // Devolvemos los datos crudos
	}

	// Obtener detalles de un podcast
	public async fetchPodcastDetails(podcastId: string): Promise<any> {
		const endpoint = `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
		const data = await this.fetchFromApi(endpoint);

		// Usar el transformador
		return transformPodcastDetails(data);
	}

	// Obtener los podcasts con caché
	public async fetchTopPodcastsWithCache(): Promise<any[]> {
		const cacheKey = 'podcasts';
		const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
		const cachedData = this.cacheManager.getCache(cacheKey, cacheDuration);

		if (cachedData) return cachedData;

		const data = await this.fetchTopPodcasts();
		this.cacheManager.setCache(cacheKey, data);
		return data;
	}

	// Obtener detalles del podcast con caché
	public async fetchPodcastDetailsWithCache(podcastId: string): Promise<any> {
		const cacheKey = `podcast_${podcastId}`;
		const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
		const cachedData = this.cacheManager.getCache(cacheKey, cacheDuration);

		if (cachedData) return cachedData;

		const data = await this.fetchPodcastDetails(podcastId);
		this.cacheManager.setCache(cacheKey, data);
		return data;
	}
}

// Instancia del servicio exportada
export const podcastService = new PodcastService();
