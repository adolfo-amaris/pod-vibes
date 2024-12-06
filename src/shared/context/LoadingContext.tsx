import React, { createContext, useContext, useState } from 'react';

// Definir el tipo del contexto
interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto con valores iniciales
export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

// Hook para usar el contexto
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading debe usarse dentro de un LoadingProvider');
  }
  return context;
};

// Proveedor del contexto
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
