import React, { useEffect, useState } from 'react';
import { fetchTopPodcastsWithCache } from '../../services/podcastService';
import Card from '../../components/Card/Card';
import './../../styles/homePage.scss';
import { useLoading } from '../../context/LoadingContext';
import { useNavigation } from '../../context/NavigationContext';
import PodcastDetailPage from '../PodcastDetailPage/PodcastDetailPage';

const HomePage: React.FC = () => {
	const [podcasts, setPodcasts] = useState<any[]>([]);
	const { setSelectedPodcast, selectedPodcast } = useNavigation();
	const [filter, setFilter] = useState('');
	const [filteredPodcasts, setFilteredPodcasts] = useState<any[]>([]);
	const { loading, setLoading } = useLoading(); // Uso del estado global de carga

	useEffect(() => {

		const loadPodcasts = async () => {

		try {
			setLoading(true);
			const data = await fetchTopPodcastsWithCache();
			setPodcasts(data);
			setFilteredPodcasts(data);
		  } catch (error) {
			console.error('Error al cargar el listado podcasts:', error);
		  } finally {
			setLoading(false);
		  }
	
		};
		
		loadPodcasts();

	}, [setLoading]);

	useEffect(() => {
		const lowercasedFilter = filter.toLowerCase();
		const filtered = podcasts.filter(
			(podcast) =>
				podcast.title.toLowerCase().includes(lowercasedFilter) ||
				podcast.author.toLowerCase().includes(lowercasedFilter)
		);
		setFilteredPodcasts(filtered);
	}, [filter, podcasts]);


	// Renderiza el detalle del podcast si hay uno seleccionado
	if (selectedPodcast) {
		return <PodcastDetailPage />;
	}

	return (
		<div className='boxppal flex flex-column'>
			<input
				type="text"
				placeholder="Filter podcasts..."
				value={filter}
				onChange={(e) => setFilter(e.target.value)}				
				className='boxppal__input align-self-end'
			/>
			{filteredPodcasts.length > 0 ? (
				<div className='boxppal__card'>
					{filteredPodcasts.map((podcast) => (
						<Card
							key={podcast.id}
							image={podcast.image}
							title={podcast.title}
							author={podcast.author}
							onClick={() => setSelectedPodcast(podcast.id)}
						/>
					))}
				</div>
			) : (
				<p>No se encontraron resultados.</p>
			)}
		</div>
	);
};

export default HomePage;
