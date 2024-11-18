import React, { useEffect, useState } from 'react';
import { fetchTopPodcastsWithCache } from '../../services/podcastService';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { useLoading } from '../../context/LoadingContext';


const HomePage: React.FC = () => {
	const [podcasts, setPodcasts] = useState<any[]>([]);
	const { loading, setLoading } = useLoading();
	const [filter, setFilter] = useState('');
	const [filteredPodcasts, setFilteredPodcasts] = useState<any[]>([]);

	const navigate = useNavigate();


	// Efecto para cargar los podcasts desde el servicio
	useEffect(() => {

		const loadPodcasts = async () => {

			try {
				setLoading(true); // Indicar que los datos están cargando
				const data = await fetchTopPodcastsWithCache();
				setPodcasts(data); // Actualizar el estado con los datos obtenidos
				setFilteredPodcasts(data); // Inicializar el estado de podcasts filtrados
				setLoading(false); // Finalizar el estado de carga
			} catch (error) {
				console.error('Error al cargar los podcasts:', error);
				setLoading(false); // Finalizar el estado de carga incluso si hay un error
			}

		};

		loadPodcasts();

	}, []);

	// Efecto para filtrar los podcasts en tiempo real
	useEffect(() => {

		const lowercasedFilter = filter.toLowerCase(); // Convertir el filtro a minúsculas
		const filtered = podcasts.filter(
			(podcast) =>
				podcast.title.toLowerCase().includes(lowercasedFilter) || // Filtrar por título
				podcast.author.toLowerCase().includes(lowercasedFilter) // Filtrar por autor
		);

		setFilteredPodcasts(filtered); // Actualizar el estado de los podcasts filtrados

	}, [filter, podcasts]); // Ejecutar el efecto cuando cambien el filtro o los podcasts


	return (
		<div>
			<h1>Podcasts más populares</h1>


			{/* Campo de entrada para el filtro */}
			<input
				type="text"
				placeholder="Buscar podcasts por título o autor..."
				value={filter}
				onChange={(e) => setFilter(e.target.value)} // Actualizar el estado del filtro
				style={inputStyle}
			/>




			{/* Mostrar el estado de carga o los podcasts */}
			{loading ? (
				<LoadingIndicator />
			) : filteredPodcasts.length > 0 ? (
				<div style={gridStyle}>
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
				<p>No se encontraron podcasts. Intenta ajustar tu búsqueda.</p>
			)};

		</div>
	);
};


const gridStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '20px',
	padding: '20px',
};

const inputStyle = {
	margin: '20px 0',
	padding: '10px',
	fontSize: '16px',
	width: '100%',
	border: '1px solid #ccc',
	borderRadius: '4px',
};


export default HomePage;
