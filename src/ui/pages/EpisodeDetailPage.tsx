import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePodcastDetails } from '../../application/use-cases/usePodcastDetails';
import './../../shared/styles/episodeDetailPage.scss';


const EpisodeDetailPage: React.FC = () => {
	const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
	const navigate = useNavigate();

	// Validamos podcastId antes de continuar
	if (!podcastId) {
		return (
			<p style={{ textAlign: 'center', marginTop: '20px' }}>
				No se encontró el episodio seleccionado. Por favor, selecciona otro.
			</p>
		);
	}

	const { podcastDetails, loading, error } = usePodcastDetails(podcastId);

	if (loading) {
		return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando episodio...</p>;
	}

	if (error || !podcastDetails) {
		return <p style={{ textAlign: 'center', marginTop: '20px' }}>Error al cargar el episodio.</p>;
	}

	const selectedEpisode = podcastDetails.episodes.find(
		(episode: any) => episode.trackId === parseInt(episodeId || '0', 10)
	);

	if (!selectedEpisode) {
		return (
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<p>No se encontró el episodio seleccionado. Por favor, selecciona otro.</p>
				<button
					onClick={() => navigate(`/podcast/${podcastId}`)}
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: '#007BFF',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Volver
				</button>
			</div>
		);
	}

	return (
		<div className='boxepisode boxstyles'>
			<h1>{selectedEpisode.trackName}</h1>
			<p>Fecha de publicación: {new Date(selectedEpisode.releaseDate).toLocaleDateString()}</p>
			<div
				className='boxepisode__description'
				dangerouslySetInnerHTML={{ __html: selectedEpisode.description }}
			></div>
			<audio controls>
				<source src={selectedEpisode.episodeUrl} type="audio/mpeg" />
				Tu navegador no soporta el reproductor de audio.
			</audio>
		</div>
	);

};

export default EpisodeDetailPage;
