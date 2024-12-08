import React, { createContext, useContext, ReactNode } from 'react';
import { GetPopularPodcastsUseCase } from '../../application/use-cases/GetPopularPodcastsUseCase';
import { GetPodcastDetailsUseCase } from '../../application/use-cases/GetPodcastDetailsUseCase';
import { usePodcastService } from './../../infrastructure/context/PodcastServiceContext';

interface PodcastProviderProps {
  children: ReactNode;
}

// Definir la estructura del contexto
const PodcastContext = createContext<{
  getPopularPodcastsUseCase: GetPopularPodcastsUseCase;
  getPodcastDetailsUseCase: GetPodcastDetailsUseCase;
} | null>(null);

export const PodcastProvider: React.FC<PodcastProviderProps> = ({
  children,
}) => {
  const podcastService = usePodcastService(); // Usar el servicio del contexto

  // Instanciar los casos de uso
  const getPopularPodcastsUseCase = new GetPopularPodcastsUseCase(
    podcastService
  );
  const getPodcastDetailsUseCase = new GetPodcastDetailsUseCase(podcastService);

  return (
    <PodcastContext.Provider
      value={{
        getPopularPodcastsUseCase,
        getPodcastDetailsUseCase,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePodcastUseCases = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error(
      'usePodcastUseCases debe ser usado dentro de PodcastProvider'
    );
  }
  return context;
};
