import React, { useEffect, useState } from 'react';
import { fetchTopPodcastsWithCache } from '../../services/podcastService';
import Card from '../../components/Card/Card';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { useNavigation } from '../../context/NavigationContext';
import PodcastDetailPage from '../PodcastDetailPage/PodcastDetailPage';

const HomePage: React.FC = () => {
	const [podcasts, setPodcasts] = useState<any[]>([]);
	const { setSelectedPodcast, selectedPodcast } = useNavigation();
	const [filter, setFilter] = useState('');
	const [filteredPodcasts, setFilteredPodcasts] = useState<any[]>([]);

	useEffect(() => {
		const loadPodcasts = async () => {
			const data = await fetchTopPodcastsWithCache();
			setPodcasts(data);
			setFilteredPodcasts(data);
		};
		loadPodcasts();
	}, []);

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
		<div>
			<h1>Podcasts más populares</h1>
			<input
				type="text"
				placeholder="Buscar podcasts por título o autor..."
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				style={{ margin: '20px 0', padding: '10px', width: '100%' }}
			/>
			{filteredPodcasts.length > 0 ? (
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
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
