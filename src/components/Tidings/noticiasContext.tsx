import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nota } from './listaTidings';

const noticiasPorDefecto: nota[] = [
  {
    id: 1,
    title: "Lanzamiento de la nueva consola",
    categoria: "Tecnología",
    autor: "Redacción GameStore",
    redaccion: "Hoy se anunció la nueva consola con características revolucionarias...",
    image: "https://media.es.wired.com/photos/678e7a0b4a80328db3440ba0/16:9/w_1600,c_limit/nintendo%20switch%202%20prezzo.jpg",
    dias: 5,
    select: false
  },
  {
    id: 2,
    title: "Actualización importante en el juego X",
    categoria: "Actualizaciones",
    autor: "Equipo GameStore",
    redaccion: "El juego X recibe una actualización que mejora la experiencia de usuario...",
    image: "https://cdn-www.bluestacks.com/bs-images/Free-Fire_December-Update_ES_6.jpg",
    dias: 3,
    select: false
  },
  {
    id: 3,
    title: "Tecnologia 4d revoluciona el mundo",
    categoria: "Tecnologia",
    autor: "RadioTech",
    redaccion: "La tecnologia 4d se acaba de popularizar con muchas mejoras ...",
    image: "https://futuroelectrico.com/wp-content/uploads/2020/09/impresion-4d-2.jpg",
    dias: 1,
    select: false
  }
];

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

function mergeNoticias(defaults: nota[], stored: nota[]): nota[] {
  // Evita duplicados por id
  const ids = new Set(stored.map(n => n.id));
  return [...stored, ...defaults.filter(n => !ids.has(n.id))];
}

export const NoticiasProvider = ({ children }: { children: ReactNode }) => {
  const [listaDeNoticias, setListaDeNoticias] = useState<nota[]>(() => {
    const data = localStorage.getItem('noticias');
    const stored = data ? JSON.parse(data) : [];
    return mergeNoticias(noticiasPorDefecto, stored);
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