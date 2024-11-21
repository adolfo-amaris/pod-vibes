import axios from 'axios';
import { log } from 'console';

const BASE_URL = 'https://itunes.apple.com';
const PROXY_URL = 'https://api.allorigins.win/get?url='; // Proxy para manejar CORS

// Función para obtener el listado de los 100 podcasts más populares
export const fetchTopPodcasts = async () => {

	try {

		const url = `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
		const response = await axios.get(`${PROXY_URL}${encodeURIComponent(url)}`);
		const data = JSON.parse(response.data.contents);

		console.log('Esto es data de top podcast', data.feed);
		

		return data.feed.entry.map((podcast: any) => ({
			id: podcast.id.attributes['im:id'],
			title: podcast['im:name'].label,
			author: podcast['im:artist'].label,
			image: podcast['im:image'][2].label,
			description: podcast['summary'].label
		}));

	} catch (error) {

		console.error('Error al obtener los podcasts:', error);
		throw error;

	}

};

// Función para obtener los detalles de un podcast específico
export const fetchPodcastDetails = async (podcastId: string) => {

	try {
		const url = `${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
		const response = await axios.get(`${PROXY_URL}${encodeURIComponent(url)}`);
		const data = JSON.parse(response.data.contents);

		console.log('responseee data..... ', response.data);
		
	

		return {

			details: data.results[0], // Detalle del podcast
			episodes: data.results.slice(1).map((episode: any) => ({
				trackId: episode.trackId,
				trackName: episode.trackName,
				description: episode.description,
				releaseDate: episode.releaseDate,
				episodeUrl: episode.episodeUrl,
				trackTimeMillis: episode.trackTimeMillis || 0,
			})),

		};
	} catch (error) {

		console.error('Error al obtener los detalles del podcast:', error);
		throw error;

	}

};

export const fetchTopPodcastsWithCache = async () => {

	const cacheKey = 'podcasts';
	const cacheTimestampKey = 'podcastsTimestamp';
	const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas

	// Verificar caché existente
	const cachedData = localStorage.getItem(cacheKey);
	const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

	if (cachedData && cachedTimestamp) {

		const isCacheValid =
			Date.now() - parseInt(cachedTimestamp, 10) < cacheDuration;
		if (isCacheValid) {
			// console.log('Cargando datos desde el caché', JSON.parse(cachedData));
			return JSON.parse(cachedData);
		}
		
	}

	// Si no hay caché o es inválido, hacer la solicitud
	console.log('Cargando datos desde el API');
	const data = await fetchTopPodcasts();

	// Guardar en caché
	localStorage.setItem(cacheKey, JSON.stringify(data));
	localStorage.setItem(cacheTimestampKey, Date.now().toString());

	return data;

};

export const fetchPodcastDetailsWithCache = async (podcastId: string) => {

	const cacheKey = `podcast_${podcastId}`;
	const cacheTimestampKey = `${cacheKey}_timestamp`;
	const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas

	// Verificar caché existente
	const cachedData = localStorage.getItem(cacheKey);
	const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

	if (cachedData && cachedTimestamp) {
		const isCacheValid =
			Date.now() - parseInt(cachedTimestamp, 10) < cacheDuration;
		if (isCacheValid) {
			console.log(`Cargando detalles del podcast ${podcastId} desde el caché`);
			return JSON.parse(cachedData);
		}
	}

	// Si no hay caché o es inválido, hacer la solicitud
	console.log(`Cargando detalles del podcast ${podcastId} desde el API`);
	const data = await fetchPodcastDetails(podcastId);

	// Guardar en caché
	localStorage.setItem(cacheKey, JSON.stringify(data));
	localStorage.setItem(cacheTimestampKey, Date.now().toString());

	return data;

};
