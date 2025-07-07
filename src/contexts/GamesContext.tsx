import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Review {
  author: string;
  message: string;
  stars: number;
}

export interface Game {
  title: string;
  description: string;
  trailer: string;
  images: string[];
  reviews: Review[];
  release_date: string;
  category: string;
  base_price: number;
  discount: number;
  platform: string;
}

interface GamesContextType {
  games: Record<string, Game>;
  addGame: (game: Game) => void;
  removeGame: (title: string) => void;
  updateGame: (title: string, updatedGame: Game) => void;
  setGamesFromLocalStorage: () => void;
}

interface GamesProviderProps {
  children: ReactNode;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const GamesProvider = ({ children }: GamesProviderProps) => {
  const [games, setGames] = useState<Record<string, Game>>({});

  useEffect(() => {
    setGamesFromLocalStorage();
  }, []);

  const setGamesFromLocalStorage = async () => {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      try {
        const response = await fetch('/data/gamesData.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo gamesData.json');
        }
        const data = await response.json();
        setGames(data);
        saveGamesToLocalStorage(data);
      } catch (error) {
        console.error('Error al cargar juegos desde JSON:', error);
      }
    }
  };

  const saveGamesToLocalStorage = (gamesData: Record<string, Game>) => {
    localStorage.setItem('games', JSON.stringify(gamesData));
  };

  const addGame = (game: Game) => {
    const newGames = { ...games, [game.title]: game };
    setGames(newGames);
    saveGamesToLocalStorage(newGames);
  };

  const removeGame = (title: string) => {
    const newGames = { ...games };
    delete newGames[title];
    setGames(newGames);
    saveGamesToLocalStorage(newGames);
  };

  const updateGame = (title: string, updatedGame: Game) => {
    const newGames = { ...games };
    if (title !== updatedGame.title) {
      delete newGames[title]; // Eliminar el anterior si cambió el nombre
    }
    newGames[updatedGame.title] = updatedGame;
    setGames(newGames);
    saveGamesToLocalStorage(newGames);
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        addGame,
        removeGame,
        updateGame,
        setGamesFromLocalStorage,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGamesContext debe usarse dentro de GamesProvider');
  }
  return context;
};

