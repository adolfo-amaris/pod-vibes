import React, { useEffect, useState } from 'react';
import { fetchTopPodcastsWithCache } from '../../services/podcastService';

const HomePage: React.FC = () => {
	const [podcasts, setPodcasts] = useState<any[]>([]);

	useEffect(() => {
		const loadPodcasts = async () => {
			const data = await fetchTopPodcastsWithCache();
			setPodcasts(data);
		};

		loadPodcasts();
	}, []);

	return (
		<div>
			<h1>Podcasts más populares</h1>
			<ul>
				{podcasts.map((podcast) => (
					<li key={podcast.id}>
						<img src={podcast.image} alt={podcast.title} />
						<h3>{podcast.title}</h3>
						<p>{podcast.author}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
