import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { usePodcastDetails } from './../../hooks/usePodcastDetails';
import { useLoading } from './../../../../shared/context/LoadingContext'; // Import loading context
import Filter from './../../components/Filter';
import { usePodcastFilter } from './../../hooks/usePodcastFilter';
import './../../styles/podcastDetailPage.scss';

const PodcastDetailPage: React.FC = () => {
	const { podcastId } = useParams<{ podcastId: string }>();
	const location = useLocation();
	const navigate = useNavigate();
	const { setLoading } = useLoading();


	// Validamos podcastId antes de continuar
	if (!podcastId) {
		return (
			<p style={{ textAlign: 'center', marginTop: '20px' }}>
				No se encontró el podcast seleccionado. Por favor, selecciona otro.
			</p>
		);
	}

	const { podcastDetails, loading, error } = usePodcastDetails(podcastId);
	const { filter, setFilter, filteredPodcasts: filteredEpisodes } = usePodcastFilter(
		podcastDetails?.episodes || []
	);

	useEffect(() => {
		setLoading(loading);
		return () => setLoading(false);
	}, [loading, setLoading]);

	// Función para formatear la duración de los episodios
	const formatDuration = (millis: number) => {
		if (!millis) return "Duración no disponible"; // Maneja el caso cuando millis es undefined
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds.padStart(2, '0')}`;
	};

	const formatDate = (releaseDate: string): string => {
		const parsedDate = new Date(releaseDate); // Convertir la cadena en un objeto Date
		const day = String(parsedDate.getDate()).padStart(2, '0'); // Día con dos dígitos
		const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
		const year = parsedDate.getFullYear(); // Año

		return `${day}/${month}/${year}`; // Formato dd/mm/yyyy
	};

	if (loading) {
		return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del podcast...</p>;
	}

	if (error || !podcastDetails || !podcastDetails.episodes) {
		return <p style={{ textAlign: 'center', marginTop: '20px' }}>Error al cargar el podcast.</p>;
	}

	const isEpisodeDetail = location.pathname.includes('/episode/');


	// Renderiza el detalle del podcast y la lista de episodios
	return (
		<div className='boxdetail flex'>
			<div className='boxdetail__container boxstyles'>
				<div className='boxdetail__boxpodcast flex flex-column'>
					<img
						className='boxpodcast_img hoverEffect'
						src={podcastDetails.details.artworkUrl600}
						alt={podcastDetails.details.collectionName}
						onClick={() => navigate(`/podcast/${podcastId}`)} // Reseteamos al listado de eposidios
					/>
					<hr />
					<div className='boxpodcast_name'>
						<h1>{podcastDetails.details.collectionName}</h1>
						<h3>by {podcastDetails.details.artistName}</h3>
					</div>
					<hr />
					<p className='boxpodcast_description'>
						<span>Description:</span>
						<br />
						{podcastDetails.details.description || 'No hay descripción disponible.'}
					</p>
				</div>
			</div>

			<div className='boxepisode__list'>
				{isEpisodeDetail ? (
					<Outlet /> /* Renderiza el detalle del episodio si está seleccionado */
				) : (
					<>
						<div className='boxepisode__header flex flex-center justify-between boxstyles'>
							<h1 className="boxepisode__title">Episodes: {podcastDetails.episodes.length}</h1>
							<Filter
								filter={filter}
								setFilter={setFilter}
								placeholder="Filter episodes..."
								count={filteredEpisodes.length}
							/>
						</div>
						<div className="episodes flex flex-column boxstyles">
							<div className="episodes__card flex">
								<div className="episodes__card-title bold">Title</div>
								<div className="episodes__card-date bold">Date</div>
								<div className="episodes__card-duration bold">Duration</div>
							</div>
							{filteredEpisodes.map((episode: any) => (
								<div
									className="episodes__card flex hoverEffect boxstyles"
									key={episode.trackId}
									onClick={() => navigate(`/podcast/${podcastId}/episode/${episode.trackId}`)}
								>
									<div className="episodes__card-title">{episode.trackName}</div>
									<div className="episodes__card-date">{formatDate(episode.releaseDate)}</div>
									<div className="episodes__card-duration">
										{formatDuration(episode.trackTimeMillis)}
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default PodcastDetailPage;
