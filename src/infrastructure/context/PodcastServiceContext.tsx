import React, { createContext, useContext } from 'react';
import { podcastService } from '../repositories/podcastService';
import { IPodcastService } from '../../application/interfaces/IPodcastService';


const PodcastServiceContext = createContext<IPodcastService | null>(null);

export const PodcastServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PodcastServiceContext.Provider value={podcastService}>
            {children}
        </PodcastServiceContext.Provider>
    );
};

export const usePodcastService = (): IPodcastService => {
    const context = useContext(PodcastServiceContext);
    if (!context) {
        throw new Error('usePodcastService debe usarse dentro de un PodcastServiceProvider');
    }
    return context;
};
