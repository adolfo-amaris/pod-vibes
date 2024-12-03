import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transformPodcasts } from '../../domain/services/podcastTransformer';
import { usePodcastService } from '../../infrastructure/context/PodcastServiceContext';
import { usePodcastFilter } from '../../application/use-cases/usePodcastFilter';
import { useLoading } from './../../shared/context/LoadingContext';
import Card from './../components/PodcastCard';
import Filter from './../components/Filter';
import './../../shared/styles/homePage.scss';
import { Podcast } from '../../domain/entities/podcast';

const HomePage: React.FC = () => {
	const podcastService = usePodcastService(); // Usar el servicio desde el contexto
	const initialPodcasts = JSON.parse(localStorage.getItem('podcasts') || '[]');
	const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
	const { filter, setFilter, filteredPodcasts } = usePodcastFilter(podcasts);
	const { loading, setLoading } = useLoading(); // Uso del estado global de carga
	const navigate = useNavigate(); // Navegar para diferentes páginas


	useEffect(() => {

		const loadPodcasts = async () => {
			try {
				setLoading(true);
				const storedPodcasts = localStorage.getItem('podcasts');
				if (storedPodcasts) {
					const parsedPodcasts = JSON.parse(storedPodcasts);
					setPodcasts(parsedPodcasts);
					setLoading(false); // Evitar solicitar de nuevo si ya están cargados
					return;
				}

				// Si no están en localStorage, cargar desde el API
				const rawPodcasts = await podcastService.fetchTopPodcastsWithCache();
				const transformedPodcasts = transformPodcasts(rawPodcasts);
				setPodcasts(transformedPodcasts);

				// Guardar los datos transformados en localStorage
				localStorage.setItem('podcasts', JSON.stringify(transformedPodcasts));
			} catch (error) {
				console.error('Error al cargar los podcasts:', error);
			} finally {
				setLoading(false);
			}
		};

		loadPodcasts();

	}, [setLoading, podcastService]);

	return (

		loading ? (
			<p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando los podcast más populares...</p>
		) : (
			<div
				className='boxppal flex flex-column'
				role="podcast-list"
			>
				<div className="boxfilter">
					<Filter
						filter={filter}
						setFilter={setFilter}
						placeholder="Filter podcasts..."
						count={filteredPodcasts.length}
					/>
				</div>


				{filteredPodcasts && filteredPodcasts.length > 0 ? (
					<div className='boxppal__card'>
						{filteredPodcasts.map((podcast) => (
							<Card
								key={podcast.id}
								image={podcast.image}
								title={podcast.title}
								author={podcast.author}
								onClick={() => navigate(`/podcast/${podcast.id}`)}
							/>
						))}
					</div>
				) : (
					<p className='boxppal__not-found' >No se encontraron resultados.</p>
				)}
			</div>
		)

	);
};

export default HomePage;
