import React, { createContext, useContext, ReactNode } from 'react';
import { PodcastServiceImpl } from '../repositories/podcastServiceImpl';
import { IPodcastService } from '../../application/interfaces/IPodcastService';

// Crear el contexto
const PodcastServiceContext = createContext<IPodcastService | null>(null);

// Props para el Provider
interface PodcastServiceProviderProps {
  children: ReactNode;
}

// Crear el Provider
export const PodcastServiceProvider: React.FC<PodcastServiceProviderProps> = ({ children }) => {
  // Crear una instancia de PodcastServiceImpl
  const podcastService: IPodcastService = new PodcastServiceImpl();

  return (
    <PodcastServiceContext.Provider value={podcastService}>
      {children}
    </PodcastServiceContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePodcastService = (): IPodcastService => {
  const context = useContext(PodcastServiceContext);
  if (!context) {
    throw new Error('usePodcastService debe ser usado dentro de un PodcastServiceProvider');
  }
  return context;
};
