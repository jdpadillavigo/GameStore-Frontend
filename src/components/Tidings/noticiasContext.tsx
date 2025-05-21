import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nota } from './listaTidings';


type NoticiasContextType = {
  listaDeNoticias: nota[];
  setListaDeNoticias: React.Dispatch<React.SetStateAction<nota[]>>;
};

const NoticiasContext = createContext<NoticiasContextType | undefined>(undefined);

export const useNoticias = () => {
  const context = useContext(NoticiasContext);
  if (!context) throw new Error('useNoticias debe usarse dentro de NoticiasProvider');
  return context;
};

export const NoticiasProvider = ({ children }: { children: ReactNode }) => {
  const [listaDeNoticias, setListaDeNoticias] = useState<nota[]>(() => {
    const data = localStorage.getItem('noticias');
    return data ? JSON.parse(data) : [];
  });
  useEffect(() => {
    localStorage.setItem('noticias', JSON.stringify(listaDeNoticias));
  }, [listaDeNoticias]);

  return (
    <NoticiasContext.Provider value={{ listaDeNoticias, setListaDeNoticias }}>
      {children}
    </NoticiasContext.Provider>
  );
};